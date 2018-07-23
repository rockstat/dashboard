import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch, RouteComponentProps } from 'react-router';
import { Root } from 'app/containers';
import { History } from 'history'
import { observer, inject } from 'mobx-react';
import { STORE_BAND } from 'app/constants';
import { BandStore } from 'app/stores';
import { BandImagesList, BandServicesList, BandImage, BandService, BandServicesDict, BandServicesMap } from 'app/types';
import { Iterator } from 'mobx';


export interface AppProps {
  history: History;
  [STORE_BAND]?: BandStore;
}

@inject(STORE_BAND)
@observer
export class App extends React.Component<AppProps, {}> {
  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" render={(props: RouteComponentProps<any>) => <Root {...props} />} />
        </Switch>
      </Router>
    );
  }
}
