import * as React from 'react';
import { Graph, Projects, SystemResources } from 'app/containers';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/components';

import { AppProps } from '../..';
import { BandImage, BandService, BandServicesMap } from 'app/types';

export interface RootProps extends AppProps{
  images?: BandImage[];
  services?: BandServicesMap;
}

export class Root extends React.Component<RootProps & RouteComponentProps<AppProps>, {}> {
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
