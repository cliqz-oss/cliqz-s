import { combineReducers } from 'redux';
import mode from './mode';
import query from './query';
import domains from './domains';
import screen from './screen';
import messages from './messages';
import tabs from './tabs';

export default combineReducers({
  mode,
  query,
  domains,
  messages,
  screen,
  tabs,
});

