import {
  fetchDomains as getDomains,
  fetchMessages as getMessages,
  recordVisit,
} from '../services/history';
import {
  UPDATE_WEBVIEW,
  UPDATE_URLBAR,
  URLBAR_QUERY,
  URLBAR_BLUR,
  OPEN_LINK,
  GO_BACK,
  GO_FORWARD,
  BACK_FORWARD_RECEIVED,
  SCREEN_CHANGED,
  SET_HISTORY,
  SET_MESSAGES_ACTION,
  OPEN_DOMAIN_ACTION,
} from '../constants/action-types';

const setHistory = payload => ({
  type: SET_HISTORY,
  payload,
});

const setMessages = payload => ({
  type: SET_MESSAGES_ACTION,
  payload,
});

export const openDomain = domain => async (dispatch) => {
  dispatch({
    type: OPEN_DOMAIN_ACTION,
  });

  const messages = await getMessages(domain);
  dispatch(setMessages(messages));
};

export const fetchDomains = () => async (dispatch) => {
  const history = await getDomains();
  dispatch(setHistory(history));
};

export const updateWebView = ({
  pageTitle,
  currentUrl,
  webCanGoBack,
  webCanGoForward,
  isLoading,
}) => async (dispatch) => {
  dispatch({
    type: UPDATE_WEBVIEW,
    payload: {
      pageTitle,
      currentUrl,
      webCanGoBack,
      webCanGoForward,
    },
  });

  if (isLoading) {
    recordVisit(currentUrl, pageTitle);
  }
};

export const urlBarBlur = url => ({
  type: URLBAR_BLUR,
  payload: {
    mode: url ? 'visit' : 'search',
  },
});

export const urlBarQuery = query => ({
  type: URLBAR_QUERY,
  payload: {
    query,
  },
});

export const updateUrlBar = query => ({
  type: UPDATE_URLBAR,
  payload: {
    query,
  },
});

export const openLink = url => ({
  type: OPEN_LINK,
  payload: {
    url,
  },
});

export const goBack = () => ({
  type: GO_BACK,
});

export const goForward = () => ({
  type: GO_FORWARD,
});

export const backForwardReceiver = () => ({
  type: BACK_FORWARD_RECEIVED,
});

export const changeScreen = screen => ({
  type: SCREEN_CHANGED,
  payload: screen,
});
