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
  SCREEN_CHANGED_ACTION,
  SET_HISTORY_ACTION,
  SET_MESSAGES_ACTION,
  OPEN_DOMAIN_ACTION,
  SWITCH_TAB_ACTION,
} from '../constants/actions';

const setHistory = payload => ({
  type: SET_HISTORY_ACTION,
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

  let messages = [];

  try {
    messages = await getMessages(domain);
  } catch (e) {
    // TODO: report errors
  }

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

export const urlBarBlur = url => ({
  type: URLBAR_BLUR_ACTION,
  payload: {
    mode: url ? 'visit' : 'search',
  },
});

export const urlBarQuery = query => ({
  type: URLBAR_QUERY_ACTION,
  payload: {
    query,
  },
});

export const updateUrlBar = query => ({
  type: UPDATE_URLBAR_ACTION,
  payload: {
    query,
  },
});

export const openLink = url => ({
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

export const changeScreen = screen => ({
  type: SCREEN_CHANGED_ACTION,
  payload: screen,
});

export const switchTab = visitId => ({
  type: SWITCH_TAB_ACTION,
  payload: visitId,
});
