import * as React from 'react';
import { Graph, Projects, SystemResources } from 'app/containers';
import { RouteComponentProps } from 'react-router';
import { Header, DashboardHeader } from 'app/components';

import { AppProps } from '../..';
import { BandImage, BandService, BandServicesMap } from 'app/types';

export interface RootProps extends RouteComponentProps<AppProps> {
  images?: BandImage[];
  services?: BandServicesMap;
}

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className='rockstat'>
        <Header />
        {/* <DashboardHeader /> */}
        <Graph {...this.props} />
        <Projects  {...this.props} />
        {/* <SystemResources /> */}
      </div>
    );
  }
}
