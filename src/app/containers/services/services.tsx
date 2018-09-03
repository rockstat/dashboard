import * as React from 'react';
import * as cl from 'classnames';
import { STORE_BAND } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { BandStore } from 'app/stores';
import { ShowIf } from 'app/components/show-if';
import { Project } from 'app/components';
import { RootProps } from 'app/containers/Root';
import { BandService, BandServicesMap, BandImage, BandImagesList } from 'app/types';

import * as styles from './style.scss';


interface ProjecstState {
  modalPosition: number;
  services?: BandServicesMap
  images?: BandImagesList
}

export interface ProjectsProps extends RootProps {
  setNewServices?: (services: BandServicesMap) => void;
}


const ContainerGrid = (props: ProjectsProps) => {
  const { services, images, setNewServices, bandStore, ...rest } = props;
  // const bandStore = this.props[STORE_BAND] as BandStore;

  const adddService = async (image: BandImage, pos: string) => {
    bandStore.runService(image.key, pos).then(services => setNewServices(services));
  };

  const runOrRebuildService = async (service: BandService, pos: string) => {
    bandStore.runService(service.name, pos).then(services => setNewServices(services))
  }

  const deleteService = async (serviceName: string) => {
    bandStore.deleteServices(serviceName)
      .then(services => setNewServices(services));
  }

  const restartService = async(serviceName: string) => {
    await bandStore.restratService(serviceName);
  }
  const stopService = async(serviceName: string) => {
    await bandStore.stopService(serviceName);
  }

  const renderImages = () => {
    const imagesResult: BandImage[] = [];

    images.forEach(item => {
      let detectRunImage: boolean = true;
      services.forEach(service => {
        if (item.key === service.name) {
          detectRunImage = false;

          return;
        }
      })

      if (detectRunImage) {
        imagesResult.push(item);
      }
    })

    return imagesResult;
  }

  const resultImages = renderImages();

  return (
    <div className={cl(styles.projectsContainer, 'projects-container')}>
      {Array.apply(0, Array(6)).map(function (_, row) {
        return Array.apply(0, Array(6)).map(function (_, col) {
          const pos = `${col}x${row}`;
          return (
            <Project
              container={services.get(pos)}
              images={resultImages}
              restartService={restartService}
              runOrRebuildService={runOrRebuildService}
              stopService={stopService}
              key={pos}
              pos={pos}
              adddService={adddService}
              deleteService={deleteService}
            // number={5}
            // onClickSettings={this._openSettings}
            />
          )
        })
      })}
    </div>
  )
}

@inject(STORE_BAND)
@observer
export class Projects extends React.Component<ProjectsProps, ProjecstState> {
  state = {
    modalPosition: 0,
    services: undefined,
    images: undefined
  }
  componentWillMount() {
    const bandStore = this.props[STORE_BAND] as BandStore;
    // const test = new WebSocket('ws://admin:123123@rstat-stage.test/api/list', ['protocol1', 'protocol2']);
    // test.onopen = () => console.log('Websocket open');
    // test.onclose = (eventError) => console.log(`Websocket close ${eventError.wasClean ? 'clean' : 'not clean'}`);
    // test.onmessage = (data) => console.log('Получены данные', data);
    // test.onerror = (error) => console.log('Error - ', error);
    Promise.resolve()
      .then(() => bandStore.loadImages())
      .then(images => { this.setState({ images }) })
      .then(() => bandStore.loadServices())
      .then(services => { this.setState({ services }) })
      .then(() => {
        this.interval = setInterval(() => {
          bandStore.loadServices().then(() => {
            this.setState({
              services: bandStore.services
            })
          })
        }, 3000);
      })
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  interval: NodeJS.Timer | number;
  setNewServices = (services: BandServicesMap) => this.setState({ services });
  // _openSettings = (index: number, e: HTMLDivElement) => {
  //   this.setState({
  //     showAdd: true,
  //     modalPosition: e.offsetTop - 631
  //   })
  // }

  // _closeSetting = () => {
  //   this.setState({
  //     showAdd: false
  //   })
  // }

  websocketConnect = (data) => {
    console.log(data);
  }

  render() {
    const { services, images } = this.state;

    return (
      <ShowIf condition={services && images}>
        <ContainerGrid {...this.props} services={services} images={images} setNewServices={this.setNewServices} />
      </ShowIf>
    )
  }
}
