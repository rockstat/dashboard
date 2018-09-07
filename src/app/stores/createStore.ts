import { History } from 'history';
import { STAT_STORE, BAND_STORE, APP_STATE } from 'app/constants';
import { StatStore } from 'app/stores';
import { BandStore } from 'app/stores/bandStore';
import { AppStateStore } from 'app/stores/app-state-store';

export function createStores() {
  const statStore = new StatStore();
  const bandStore = new BandStore();
  const appStateStore = new AppStateStore();
  return {
    [STAT_STORE]: statStore,
    [BAND_STORE]: bandStore,
    [APP_STATE]: appStateStore,
  };
}

export interface InjectedStores  {
  [STAT_STORE]: StatStore,
  [BAND_STORE]: BandStore,
  [APP_STATE]: AppStateStore
}
