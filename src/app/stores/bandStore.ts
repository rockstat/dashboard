import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from 'app/api';
import { BandServicesList, BandImagesList, BandService, BandImage } from 'app/types';

const TEST_IMAGES = [
  {
    name: 'name1',
    base: 'base',
    key: 'key',
    path: 'path',
    title: 'TITLE'
  },
  {
    name: 'name2',
    base: 'base',
    key: 'key',
    path: 'path',
    title: 'TITLE'
  },
  {
    name: 'name3',
    base: 'base',
    key: 'key',
    path: 'path',
    title: 'TITLE'
  }
]

const TEST_SERVICES = [
  {
    name: 'Name1',
    title: 'title',
    state: 'running',
    uptime: 23,
    pos: {
      col: 0,
      row: 0
    },
    mem: 3,
    cpu: 5,
    sla: 20,
    enhancer: '123',
    meta: {
      managed: false,
      native: true,
      protected: false,
      persistent: true
    }
  },
  {
    name: 'Name2',
    title: 'title',
    state: 'running',
    uptime: 23,
    pos: {
      col: 1,
      row: 0
    },
    mem: 3,
    cpu: 5,
    sla: 20,
    enhancer: '123',
    meta: {
      managed: false,
      native: true,
      protected: false,
      persistent: true
    }
  },
  {
    name: 'Name3',
    title: 'title',
    state: 'running',
    uptime: 23,
    pos: {
      col: 2,
      row: 1
    },
    mem: 3,
    cpu: 5,
    sla: 20,
    enhancer: '123',
    meta: {
      managed: false,
      native: true,
      protected: false,
      persistent: true
    }
  }
]

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
  updateServices(name: string, pos: string) {
    this.services.forEach((item: BandService) => {
       if (item.name === name) {
          this.servicesRegistry.set(pos, item);
       }
    })

    return this.services;
  }

  @action
  loadServices() {
    this.imagesLoading = true;
    const testFUNC = () => TEST_SERVICES;
    return Promise.resolve(testFUNC())
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


    // return BandApi.services()
    //   .then(action((records: BandServicesList) => {
    //     this.servicesRegistry.clear();

    //     records.forEach(record => {
    //       const pos = `${record.pos.col}x${record.pos.row}`
    //       this.servicesRegistry.set(pos, record)
    //     });
    //     return this.services;
    //   }))
    //   .finally(action(() => {
    //     this.servicesLoading = false;
    //   }));
  }

  @action
  loadImages() {
    this.imagesLoading = true;
    const testFUNC = () => TEST_IMAGES;
    return Promise.resolve(testFUNC())
            .then(action((records: BandImagesList) => {
              this.imagesRegistry.clear();
              records.forEach(record => this.imagesRegistry.set(record.name, record));
              return this.images;
            }))
            .finally(action(() => {
              this.imagesLoading = false;
            }));

    // return BandApi.images()
    //   .then(action((records: BandImagesList) => {
    //     this.imagesRegistry.clear();
    //     records.forEach(record => this.imagesRegistry.set(record.name, record));
    //     return this.images;
    //   }))
    //   .finally(action(() => {
    //     this.imagesLoading = false;
    //   }));
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
        const pos = `${record.pos.col}x${record.pos.row}`
        this.servicesRegistry.set(pos, record);

        return this.servicesRegistry;
      }))
  }
  @action
  stopService(serviceName) {
    return BandApi.stopService(serviceName)
  }
}
