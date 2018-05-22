import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers';

export const App = hot(module)(({ history }) => (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Root} />
      </Switch>
    </Router>
));
