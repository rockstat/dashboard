import * as React from 'react';
import { Graph, Projects, SystemResources } from '../index';
import { RouteComponentProps } from 'react-router';
import { Header, DashboardHeader } from 'app/components';

export interface RootProps extends RouteComponentProps<any> {}

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className='rockstat'>
        <Header />
        <DashboardHeader />
        <Graph {...this.props}/>
        <Projects />
        {/* <SystemResources /> */}
      </div>
    );
  }
}
