import * as React from 'react';
import { GraphTest } from '../index';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/components';

export interface RootProps extends RouteComponentProps<any> {}

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className='rockstat'>
        <Header />
        <GraphTest {...this.props}/>
      </div>
    );
  }
}
