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
import { ShowIf } from './components/Utils/show-if'


export interface AppProps {
  history: History;
  [STORE_BAND]?: BandStore;
}

export interface AppState {
  images?: BandImage[];
  services?: BandServicesMap;
}

@inject(STORE_BAND)
@observer
export class App extends React.Component<AppProps, AppState> {

  state = {
    images: undefined,
    services: undefined
  }

  async componentWillMount() {
    const { band } = this.props;
    Promise.resolve()
      .then(() => band.loadImages())
      .then(images => { this.setState({ images }) })
      .then(() => band.loadServices())
      .then(services => this.setState({ services }));
  }

  render() {
    const { images, services } = this.state;
    const { band, history } = this.props;

    return (
      <ShowIf condition={images && services}>
        <Router history={history}>
          <Switch>
            <Route path="/" render={(props: RouteComponentProps<any>) => <Root images={images} services={services} {...props} />} />
          </Switch>
        </Router>
      </ShowIf>
    );
  }
}
