import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header, OnlineStatus, DashChart, ServicesGrid, HeaderDatePickerComponent } from 'app/components';

import { BandImage, BandServicesMap, BandService, BandImagesList } from 'app/types';
import { inject, observer } from 'mobx-react';
import { BAND_STORE, STAT_STORE, APP_STATE } from 'app/constants';
import { BandStore, AppStateStore } from 'app/stores';

export interface DashboardProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
}

export interface DashboardState {
  images?: BandImagesList;
  // services?: BandServicesMap;
}

// @inject(appState, STAT_STORE, APP_STATE)
@inject(APP_STATE, STAT_STORE, BAND_STORE)
@observer
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state = {}
  interval: number;

  async componentWillMount() {
    const bandStore = this.props[BAND_STORE] as BandStore;
    // await bandStore.reloadData()
    // Promise.resolve()
    //   .then(() => bandStore.loadServices())
    //   .then(() => bandStore.loadImages())
    //   .then(images => { this.setState({ images }) })
    //   // .then(services => { this.setState({ services }) })
    //   .then(() => {
    //     this.interval = window.setInterval(() => {
    //       bandStore.loadServices().then(() => {
    //         // this.setState({
    //         //   services: bandStore.services
    //         // })
    //       })
    //     }, 5000);
    //   })
  }



  addService = async (image: BandImage, pos: string) => {
    await this.props[BAND_STORE].runService(image.key, pos)
    // .then(services => this.setNewServices(services));
  };

  runOrRebuildService = async (service: BandService, pos: string) => {
    await this.props[BAND_STORE].runService(service.name, pos)
    // .then(services => this.setNewServices(services))
  }

  deleteService = async (serviceName: string) => {
    await this.props[BAND_STORE].deleteServices(serviceName)
    // .then(services => this.setNewServices(services));
  }

  restartService = async (serviceName: string) => {
    await this.props[BAND_STORE].restratService(serviceName);
  }

  stopService = async (serviceName: string) => {
    await this.props[BAND_STORE].stopService(serviceName);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  // setNewServices = (services: BandServicesMap) => this.setState({ services });

  updateService = (name: string, pos: string) => {
    this.props[BAND_STORE].updateServices(name, pos);

    // this.setState({
    //   services: newServices
    // });
  }


  render() {
    const bandStore = this.props[BAND_STORE] as BandStore;
    const { wsConnected } = this.props[APP_STATE] as AppStateStore;
    return (
      <div className='rockstat'>
        <Header>
          {/* <HeaderDatePickerComponent key={"date-picker"} toDate={appState.toDate} fromDate={appState.toDate} steps={StatSteps}  /> */}
          <OnlineStatus wsConnected={wsConnected} />
        </Header>
        {/* <DashboardHeader /> */}
        <DashChart {...this.props} />
        <ServicesGrid  {...this.props}
          images={this.props[BAND_STORE].images}
          servicesLoading={this.props[BAND_STORE].servicesLoading}
          services={this.props[BAND_STORE].services}
          onRestart={this.restartService}
          onStop={this.stopService}
          onDelete={this.deleteService}
          onRun={this.runOrRebuildService}
          onAdd={this.addService}
          updateService={this.updateService}
        />
        {/* <SystemResources /> */}
      </div>
    );
  }
}
