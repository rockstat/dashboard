import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from '../api';
import { BandServicesList, BandImagesList } from 'app/types';

export class ProjectsStore {

  // Common logic
  @observable servicesLoading = false;
  @observable imagesLoading = false;
  @observable servicesRegistry = observable.map();
  @observable imagesRegistry = observable.map();

  clear() {
    this.servicesRegistry.clear();
    this.imagesRegistry.clear();
  }

  @observable currentProjectId = null;

  @computed
  get services() {
    return this.servicesRegistry.values();
  };

  @computed
  get images() {
    return this.imagesRegistry.values();
  };

  @computed
  get service() {
    return this.servicesRegistry.get(this.currentProjectId);
  };

  @action
  loadServices() {
    this.servicesLoading = true;
    return BandApi.services()
      .then(action((records: BandServicesList) => {
        this.servicesRegistry.clear();
        records.forEach(record => this.servicesRegistry.set(record.name, record));
        return this.services;
      }))
      .finally(action(() => {
        this.servicesLoading = false;
      }));
  }

  @action
  loadImages() {
    this.imagesLoading = true;
    return BandApi.images()
      .then(action((records: BandImagesList) => {
        this.imagesRegistry.clear();
        records.forEach(record => this.imagesRegistry.set(record.name, record));
        return this.images;
      }))
      .finally(action(() => {
        this.imagesLoading = false;
      }));
  }
}

export const projectStore = new ProjectsStore();
