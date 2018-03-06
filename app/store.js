import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default function configureStore() {
  const store = createStore(rootReducer);
  return store;
}
