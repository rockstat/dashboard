import * as React from 'react';
import { Router, Route, Switch } from 'react-router';
import { InjectedStores } from 'app/stores';
import { History } from 'history'

import { Root, Dashboard, Logs } from 'app/containers'

export interface AppProps extends InjectedStores {
  history: History;
}

export class App extends React.Component<AppProps, {}> {

  render() {
    const { history } = this.props;
    return (
      <Root>
        <Router history={history}>
          <Switch>
            <Route path="/logs" component={Logs} />} />
            <Route path="/" component={Dashboard} />} />
          </Switch>
        </Router>
      </Root>
    );
  }
}
