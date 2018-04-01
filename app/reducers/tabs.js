import {
  OPEN_LINK,
  UPDATE_WEBVIEW,
  URLBAR_QUERY,
  GO_BACK,
  GO_FORWARD,
  BACK_FORWARD_RECEIVED,
  SWITCH_TAB_ACTION,
} from '../constants/action-types';

export default function tabs(state = [], action) {
  if (action.type === OPEN_LINK) {
    return [
      ...state.map(tab => ({
        ...tab,
        selected: false,
      })),
      {
        url: action.payload.url,
        currentUrl: action.payload.url,
        selected: true,
        id: Date.now(),
        shouldGoBack: false,
        shouldGoForward: false,
      },
    ];
  }

  if (action.type === SWITCH_TAB_ACTION) {
    return [
      ...state.map(tab => ({
        ...tab,
        selected: action.payload === tab.visitId,
      })),
    ];
  }

  // Those actions update tab state
  if ([
    UPDATE_WEBVIEW,
    URLBAR_QUERY,
    GO_BACK,
    GO_FORWARD,
    BACK_FORWARD_RECEIVED,
  ].includes(action.type)) {
    const selectedTabIndex = state.findIndex(tab => tab.selected);

    if (selectedTabIndex === -1) {
      return state;
    }

    const selectedTab = state[selectedTabIndex];
    let propsToUpdate = {};

    if (action.type === UPDATE_WEBVIEW) {
      propsToUpdate = {
        canGoBack: action.payload.webCanGoBack,
        canGoForward: action.payload.webCanGoForward,
        title: action.payload.pageTitle,
        currentUrl: action.payload.currentUrl,
        visitId: action.payload.timestamp,
      };
    }

    if (action.type === URLBAR_QUERY) {
      propsToUpdate = {
        canGoBack: false,
        canGoForward: false,
      };
    }

    if (action.type === GO_BACK) {
      propsToUpdate = {
        shouldGoBack: true,
      };
    }

    if (action.type === GO_FORWARD) {
      propsToUpdate = {
        shouldGoForward: true,
      };
    }

    if (action.type === BACK_FORWARD_RECEIVED) {
      propsToUpdate = {
        shouldGoBack: false,
        shouldGoForward: false,
      };
    }

    return [
      ...state.slice(0, selectedTabIndex),
      {
        ...selectedTab,
        ...propsToUpdate,
      },
      ...state.slice(selectedTabIndex + 1),
    ];
  }
  return state;
}
