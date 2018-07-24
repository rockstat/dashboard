import * as React from 'react';
import * as cl from 'classnames';
import { STORE_BAND } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { BandStore } from 'app/stores';
import { ShowIf } from 'app/components/Utils/show-if';
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
  [STORE_BAND]?: BandStore;
}


const ContainerGrid = (props: ProjectsProps) => {
  const { services, images, band, ...rest } = props;
  const runService = async (image: BandImage, pos: string) => {
    const { band } = props;
    await band.runService(image.key, pos);
  }
  const deleteService = async (serviceName: string) => {
    const { band } = props;

    await band.deleteServices(serviceName);
  }

  return (
    <div className={cl(styles.projectsContainer, 'projects-container')}>
      {Array.apply(0, Array(6)).map(function (_, row) {
        return Array.apply(0, Array(6)).map(function (_, col) {
          const pos = `${col}x${row}`;
          return (
            <Project
              container={services.get(pos)}
              all={images && images}
              key={pos}
              pos={pos}
              serviceLoading={band.serviceOnceLoading}
              onRunClick={runService}
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
    const { band } = this.props;
    // const test = new WebSocket('ws://admin:123123@rstat-stage.test/api/list', ['protocol1', 'protocol2']);
    // test.onopen = () => console.log('Websocket open');
    // test.onclose = (eventError) => console.log(`Websocket close ${eventError.wasClean ? 'clean' : 'not clean'}`);
    // test.onmessage = (data) => console.log('Получены данные', data);
    // test.onerror = (error) => console.log('Error - ', error);
    Promise.resolve()
      .then(() => band.loadImages())
      .then(images => { this.setState({ images }) })
      .then(() => band.loadServices())
      .then(services => { this.setState({ services }) })
      .then(() => {
        this.interval = setInterval(() => {
          band.loadServices().then(() => {
            this.setState({
              services: band.services
            })
          })
        }, 3000);
      })
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  interval: NodeJS.Timer | number;
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
    let { services, images } = this.state;

    return (
      <ShowIf condition={services && images}>
        <ContainerGrid {...this.props} services={services} images={images} />
      </ShowIf>
    )
  }
}
