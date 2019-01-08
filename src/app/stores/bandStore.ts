import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from 'app/api';
import { BandServicesList, BandImagesList, BandService, BandImage, BandServicePos } from 'app/types';

// const TEST_IMAGES = [
//   {
//     name: 'name1',
//     base: 'base',
//     key: 'key',
//     path: 'path',
//     title: 'TITLE'
//   },
//   {
//     name: 'name2',
//     base: 'base',
//     key: 'key',
//     path: 'path',
//     title: 'TITLE'
//   },
//   {
//     name: 'name3',
//     base: 'base',
//     key: 'key',
//     path: 'path',
//     title: 'TITLE'
//   }
// ]

// const TEST_SERVICES = [
//   {
//     name: 'Name1',
//     title: 'title',
//     state: 'running',
//     uptime: 23,
//     pos: {
//       col: 0,
//       row: 0
//     },
//     mem: 3,
//     cpu: 5,
//     sla: 20,
//     enhancer: '123',
//     meta: {
//       managed: false,
//       native: true,
//       protected: false,
//       persistent: true
//     }
//   },
//   {
//     name: 'Name2',
//     title: 'title',
//     state: 'running',
//     uptime: 23,
//     pos: {
//       col: 1,
//       row: 0
//     },
//     mem: 3,
//     cpu: 5,
//     sla: 20,
//     enhancer: '123',
//     meta: {
//       managed: false,
//       native: true,
//       protected: false,
//       persistent: true
//     }
//   },
//   {
//     name: 'Name3',
//     title: 'title',
//     state: 'running',
//     uptime: 23,
//     pos: {
//       col: 2,
//       row: 1
//     },
//     mem: 3,
//     cpu: 5,
//     sla: 20,
//     enhancer: '123',
//     meta: {
//       managed: false,
//       native: true,
//       protected: false,
//       persistent: true
//     }
//   }
// ]


const posToStr = (pos) => {
  return `${pos.col}x${pos.row}`
}
const strPosToObj = (pos) => {
  const [col, row]:[number, number] = pos.split('x')
  return {col, row}
}

export class BandStore {
  interval: number
  interval2: number
  // Common logic
  @observable servicesLoading = false;
  @observable imagesLoading = false;
  @observable servicesRegistry = observable.map<BandService>();
  @observable imagesRegistry = observable.map<BandImage>();
  constructor() {
    this.interval = window.setInterval(() => {this.loadServices().then(() => {})}, 5000)
    this.interval2 = window.setInterval(() => {this.loadImages().then(() => {})}, 60000)
    this.loadImages().then(() => {})
    this.loadServices().then(() => {})
  }

  clear() {
    this.servicesRegistry.clear();
    this.imagesRegistry.clear();
  }

  @observable currentProjectId = null;

  @computed get services() {
    return this.servicesRegistry.toJSON();
  };

  @computed
  get images() {
    return this.imagesRegistry.values();
  };

  // @computed
  // get service() {
  //   return this.servicesRegistry.get(this.currentProjectId);
  // };

  @action
  updateServices(name: string, pos: string) {
    console.log(name, pos)
    return BandApi.setPos(name, pos)
      .then(action((record: BandService) => {}))
      .then(action(() => this.loadServices()))
    // this.services.forEach((item: BandService) => {
    // if (item.name === name) {
    //   const posParse: string[] = pos.split('x');
    //   const posOldItem = `${item.pos.col}x${item.pos.row}`
    //   this.servicesRegistry.delete(posOldItem);
    //   this.servicesRegistry.set(pos, {
    //     ...item,
    //     pos: {
    //       col: Number(posParse[0]),
    //       row: Number(posParse[1])
    //     }
    //   });
    // }
    // });

    // 
  }



  @action
  loadServices() {
    this.imagesLoading = true;
    // const testFUNC = () => TEST_SERVICES;
    // return Promise.resolve(testFUNC())
    //         .then(action((records: BandServicesList) => {
    //           this.servicesRegistry.clear();

    //           records.forEach(record => {
    //             const pos = `${record.pos.col}x${record.pos.row}`
    //             this.servicesRegistry.set(pos, record)
    //           });
    //           return this.services;
    //         }))
    //         .finally(action(() => {
    //           this.servicesLoading = false;
    //         }));


    return BandApi.services()
      .then(action((records: BandServicesList) => {
        this.servicesRegistry.clear();
        records.forEach(action((record: BandService) => {
          this.servicesRegistry.set(posToStr(record.pos), record)
        }));
        return this.services;
      }))
      .finally(action(() => {
        this.servicesLoading = false;
      }));
  }

  @action
  loadImages() {
    this.imagesLoading = true;
    // const testFUNC = () => TEST_IMAGES;
    // return Promise.resolve(testFUNC())
    //         .then(action((records: BandImagesList) => {
    //           this.imagesRegistry.clear();
    //           records.forEach(record => this.imagesRegistry.set(record.name, record));
    //           return this.images;
    //         }))
    //         .finally(action(() => {
    //           this.imagesLoading = false;
    //         }));

    return BandApi.images()
      .then(action((records: BandImagesList) => {
        this.imagesRegistry.clear();
        records.forEach(action((record: BandImage) => this.imagesRegistry.set(record.name, record)));
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
        // let serviceDetect: boolean = false;
        this.servicesRegistry.set(pos, record);

        // this.servicesRegistry.forEach(item => {
        //   if (item.name === record.name){
        //     serviceDetect = true;
        //   }
        //   return;
        // });

        // if (!serviceDetect) {
        //   const pos = `${record.pos.col}x${record.pos.row}`;

        // }

        return this.services;
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

  async reloadData() {
    await this.loadImages()
    await this.loadServices()
  }

}
