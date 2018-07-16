import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from '../api';
import { BandServicesList, BandImagesList, BandService, BandImage } from 'app/types';

export class BandStore {

  // Common logic
  @observable servicesLoading = false;
  @observable imagesLoading = false;
  @observable servicesRegistry = observable.map<BandService>();
  @observable imagesRegistry = observable.map<BandImage>();

  clear() {
    this.servicesRegistry.clear();
    this.imagesRegistry.clear();
  }

  @observable currentProjectId = null;

  @computed
  get services() {
    return this.servicesRegistry;
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

        records.forEach(record => {
          const pos = `${record.pos.col}x${record.pos.row}`
          this.servicesRegistry.set(pos, record)
        });
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
