import { Dispatch } from 'redux';
import {
  fetchDomains as getDomains,
  fetchMessages as getMessages,
  recordVisit,
} from '../services/history';
import {
  UPDATE_WEBVIEW_ACTION,
  UPDATE_URLBAR_ACTION,
  URLBAR_QUERY_ACTION,
  URLBAR_BLUR_ACTION,
  OPEN_LINK_ACTION,
  GO_BACK_ACTION,
  GO_FORWARD_ACTION,
  BACK_FORWARD_RECEIVED_ACTION,
  SCREEN_CHANGE_ACTION,
  SET_HISTORY_ACTION,
  SET_MESSAGES_ACTION,
  OPEN_DOMAIN_ACTION,
  SWITCH_TAB_ACTION,
} from '../constants/actions';
import { State } from '../reducers/index';

type Message = {

};

type History = {

};

const setHistory = (payload: History[]) => ({
  payload,
  type: SET_HISTORY_ACTION,
});

const setMessages = (payload: Message[]) => ({
  payload,
  type: SET_MESSAGES_ACTION,
});

export const openDomain = (domain: string) => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: OPEN_DOMAIN_ACTION,
  });

  let messages: Message[] = [];

  try {
    messages = await getMessages(domain);
  } catch (e) {
    // TODO: report errors
  }

  dispatch(setMessages(messages));
};

export const fetchDomains = () => async (dispatch: Dispatch<any>) => {
  const history = await getDomains();
  dispatch(setHistory(history));
};

export const updateWebView = ({
  pageTitle,
  currentUrl,
  webCanGoBack,
  webCanGoForward,
  isLoading,
}: {
  pageTitle: string,
  currentUrl: string,
  webCanGoBack: boolean,
  webCanGoForward: boolean,
  isLoading: boolean,
}) => async (dispatch: Dispatch<any>) => {
  const timestamp = Date.now() * 1000;

  dispatch({
    type: UPDATE_WEBVIEW_ACTION,
    payload: {
      pageTitle,
      currentUrl,
      webCanGoBack,
      webCanGoForward,
      timestamp,
    },
  });

  if (!isLoading) {
    recordVisit(currentUrl, pageTitle, timestamp);
  }
};

export const urlBarBlur = (url: string) => ({
  type: URLBAR_BLUR_ACTION,
  payload: {
    mode: url ? 'visit' : 'search',
  },
});

export const urlBarQuery = (query: string) => ({
  type: URLBAR_QUERY_ACTION,
  payload: {
    query,
  },
});

export const updateUrlBar = (query: string) => ({
  type: UPDATE_URLBAR_ACTION,
  payload: {
    query,
  },
});

export const openLink = (url: string) => ({
  type: OPEN_LINK_ACTION,
  payload: {
    url,
  },
});

export const goBack = () => ({
  type: GO_BACK_ACTION,
});

export const goForward = () => ({
  type: GO_FORWARD_ACTION,
});

export const backForwardReceiver = () => ({
  type: BACK_FORWARD_RECEIVED_ACTION,
});

export const changeScreen = (screen: string) => ({
  type: SCREEN_CHANGE_ACTION,
  payload: screen,
});

export const switchTab = (visitId: number) => ({
  type: SWITCH_TAB_ACTION,
  payload: visitId,
});
