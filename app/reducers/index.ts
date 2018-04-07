import { combineReducers } from 'redux';
import mode from './mode';
import query from './query';
import domains from './domains';
import screen from './screen';
import messages from './messages';
import tabs from './tabs';

export type State = {
  mode: any,
  query: any,
  domains: any,
  messages: any,
  screen: any,
  tabs: any,
};

export default combineReducers<State>({
  mode,
  query,
  domains,
  messages,
  screen,
  tabs,
});

