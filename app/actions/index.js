import {
  UPDATE_WEBVIEW,
  UPDATE_URLBAR,
  URLBAR_QUERY,
  URLBAR_BLUR,
  OPEN_LINK,
  GO_BACK,
  GO_FORWARD,
  BACK_FORWARD_RECEIVED,
} from '../constants/action-types';

export const updateWebView = ({
  pageTitle,
  currentUrl,
  webCanGoBack,
  webCanGoForward,
}) => ({
  type: UPDATE_WEBVIEW,
  payload: {
    pageTitle,
    currentUrl,
    webCanGoBack,
    webCanGoForward,
  },
});

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
