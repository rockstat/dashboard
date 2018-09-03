import { History } from 'history';
import { STORE_STAT, STORE_BAND, STORE_APP_STATE } from 'app/constants';
import { StatStore } from 'app/stores';
import { BandStore } from 'app/stores/bandStore';
import { AppStateStore } from 'app/stores/app-state';

export function createStores(history: History, defaultTodos?: any) {
  const statStore = new StatStore();
  const bandStore = new BandStore();
  const appStateStore = new AppStateStore();
  return {
    statStore,
    bandStore,
    appStateStore,
  };
}

export interface injectedStores {
  statStore: StatStore,
  bandStore: BandStore,
  AppStateStore: AppStateStore
}
