import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(reduxThunk));
  return store;
}
