import { History } from 'history';
import { STORE_STAT, STORE_BAND, STORE_TIME } from 'app/constants';
import { StatStore } from 'app/stores';
import { BandStore } from './bandStore';
import { TimeStore } from './timeStore';

export function createStores(history: History, defaultTodos?: any) {
  const statStore = new StatStore();
  const bandStore = new BandStore();
  const timeStore = new TimeStore();
  return {
    [STORE_STAT]: statStore,
    [STORE_BAND]: bandStore,
    [STORE_TIME]: timeStore,
  };
}
