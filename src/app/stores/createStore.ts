import { History } from 'history';
import { STORE_STAT } from 'app/constants';
import { StatStore } from 'app/stores';

export function createStores(history: History, defaultTodos?: any) {
  const statStore = new StatStore();
  return {
    [STORE_STAT]: statStore
  };
}
