import {
  UPDATE_WEBVIEW,
  URLBAR_QUERY,
  GO_BACK,
  GO_FORWARD,
  BACK_FORWARD_RECEIVED,
} from '../constants/action-types';

const defaultState = {
  canGoBack: false,
  canGoForward: false,
  shouldGoBack: false,
  shouldGoForward: false,
};

export default function webView(state = defaultState, action) {
  if (action.type === UPDATE_WEBVIEW) {
    return {
      ...state,
      canGoBack: action.payload.webCanGoBack,
      canGoForward: action.payload.webCanGoForward,
    };
  }

  if (action.type === URLBAR_QUERY) {
    return {
      ...state,
      canGoBack: false,
      canGoForward: false,
    };
  }

  if (action.type === GO_BACK) {
    return {
      ...state,
      shouldGoBack: true,
    };
  }

  if (action.type === GO_FORWARD) {
    return {
      ...state,
      shouldGoForward: true,
    };
  }

  if (action.type === BACK_FORWARD_RECEIVED) {
    return {
      ...state,
      shouldGoBack: false,
      shouldGoForward: false,
    };
  }

  return state;
}
