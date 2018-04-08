import { initialState as domainsInitialState } from './reducers/domains';
import { initialState as modeInitialState } from './reducers/mode';
import { initialState as queryInitialState } from './reducers/query';
import { initialState as messagesInitialState } from './reducers/messages';
import { initialState as screenInitialState } from './reducers/screen';
import { initialState as tabsInitialState } from './reducers/tabs';

export type AppState = {
  mode: typeof modeInitialState,
  query: typeof queryInitialState,
  domains: typeof domainsInitialState,
  messages: typeof messagesInitialState,
  screen: typeof screenInitialState,
  tabs: typeof tabsInitialState,
};

