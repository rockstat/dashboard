import { History } from 'history';
import { TodoModel } from 'app/models';
// import { TodoStore } from './TodoStore';
// import { RouterStore } from './RouterStore';
import { STORE_STAT } from 'app/constants';
import { StatStore } from 'app/stores';

export function createStores(history: History, defaultTodos?: TodoModel[]) {
  // const todoStore = new TodoStore(defaultTodos);
  // const routerStore = new RouterStore(history);
  const statStore = new StatStore();
  return {
    [STORE_STAT]: statStore
  };
}
