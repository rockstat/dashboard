import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header, DashChart, ServicesGrid, ShowIf } from 'app/components';

import { BandImage, BandServicesMap, BandService, BandImagesList } from 'app/types';
import { inject, observer } from 'mobx-react';
import { STORE_BAND, STORE_STAT } from 'app/constants';
import { BandStore } from 'app/stores';

export interface DashboardProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
}

export interface DashboardState {
  images?: BandImagesList;
  services?: BandServicesMap;
}

@inject(STORE_BAND, STORE_STAT)
@observer
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state = {}
  componentWillMount() {
    const bandStore = this.props[STORE_BAND] as BandStore;
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

  interval: NodeJS.Timer | number;
  addService = async (image: BandImage, pos: string) => {
    this.props[STORE_BAND].runService(image.key, pos).then(services => this.setNewServices(services));
  };

  runOrRebuildService = async (service: BandService, pos: string) => {
    this.props[STORE_BAND].runService(service.name, pos).then(services => this.setNewServices(services))
  }

  deleteService = async (serviceName: string) => {
    this.props[STORE_BAND].deleteServices(serviceName)
      .then(services => this.setNewServices(services));
  }

  restartService = async (serviceName: string) => {
    await this.props[STORE_BAND].restratService(serviceName);
  }

  stopService = async (serviceName: string) => {
    await this.props[STORE_BAND].stopService(serviceName);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  setNewServices = (services: BandServicesMap) => this.setState({ services });

  render() {
    const bandStore = this.props[STORE_BAND] as BandStore;
    return (
      <div className='rockstat'>
        <Header />
        {/* <DashboardHeader /> */}
        <DashChart {...this.props} />
        <ServicesGrid  {...this.props}
          images={bandStore.images}
          services={bandStore.services}
          onRestart={this.restartService}
          onStop={this.stopService}
          onDelete={this.deleteService}
          onRun={this.runOrRebuildService}
          onAdd={this.addService}
        />
        {/* <SystemResources /> */}
      </div>
    );
  }
}
