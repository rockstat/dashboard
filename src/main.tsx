import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';
import { App } from 'app';

import { shim } from 'promise.prototype.finally';
shim();

import './app/base/reset.scss';
import './app/base/fonts.scss';
import './app/base/index.scss';

import '!style-loader!css-loader!../node_modules/react-vis/dist/style.css'
import '!style-loader!css-loader!../node_modules/react-virtualized/styles.css'

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
export const history = createBrowserHistory();
export const rootStore = createStores(history);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
