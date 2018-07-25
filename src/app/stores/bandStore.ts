import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from 'app/api';
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

  @action
  runService(name: string, pos: string) {
    return BandApi.run(name, pos)
      .then(action((record: BandService) => {
        let serviceDetect: boolean = false;

        this.servicesRegistry.forEach(item => {
          if (item.name === record.name) serviceDetect = true;

          return;
        });

        if (!serviceDetect) {
          const pos = `${record.pos.col}x${record.pos.row}`;
          this.servicesRegistry.set(pos, record);
        }

        return this.servicesRegistry;
      })
    );
  }

  @action
  deleteServices(serviceName) {
    return BandApi.deleteService(serviceName)
      .then(action((record) => {
        if (record) {
          let serviceDetect: boolean = false;
          let serviceIndex: string = '-1';

          this.servicesRegistry.forEach((item, index) => {
            if (item.name === serviceName) {
              serviceDetect = true;
              serviceIndex = index;
            }
  
            return;
          });
  
          if (!serviceDetect && serviceIndex !== '-1') {
            this.servicesRegistry.delete(serviceIndex);
          }
  
          return this.servicesRegistry;
        }
      })
    )
  }

  @action
  restratService(serviceName) {
    return BandApi.restratService(serviceName)
      .then(action((record: BandService) => {

      }))
  }
  @action
  stopService(serviceName) {
    return BandApi.stopService(serviceName)
  }
}
