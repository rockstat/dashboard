import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch, RouteComponentProps } from 'react-router';
import { Root } from 'app/containers';
import { History } from 'history'
import { observer, inject } from 'mobx-react';
// import { inject } from 'app/lib/inject'
import { STORE_BAND } from 'app/constants';
import { BandStore, AppStateStore, StatStore } from 'app/stores';


export interface AppProps {
  history: History;
  bandStore?: BandStore;
  appStateStore?: AppStateStore;
  statStore?: StatStore;
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
