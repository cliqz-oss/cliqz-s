import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { middleware as navMiddleware } from './utils/redux';


export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, navMiddleware));
  return store;
}
