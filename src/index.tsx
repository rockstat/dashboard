import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';
import { App } from 'app/app';
import { shim } from 'promise.prototype.finally';
shim();

import './app/base/reset.css';
import './app/base/fonts.css';
import './app/base/index.css';

import '!style-loader!css-loader!../node_modules/react-vis/dist/style.css'
import '!style-loader!css-loader!../node_modules/react-virtualized/styles.css'

// enable MobX strict mode
configure({enforceActions: "always"});

// prepare MobX stores
export const history = createBrowserHistory();
export const rootStore = createStores()

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} {...rootStore} />
  </Provider>,
  document.getElementById('root')
);
