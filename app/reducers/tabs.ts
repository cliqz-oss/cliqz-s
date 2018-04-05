import {
  OPEN_LINK_ACTION,
  UPDATE_WEBVIEW_ACTION,
  URLBAR_QUERY_ACTION,
  GO_BACK_ACTION,
  GO_FORWARD_ACTION,
  BACK_FORWARD_RECEIVED_ACTION,
  SWITCH_TAB_ACTION,
} from '../constants/actions';

type Tab = {
  url: string,
  currentUrl: string,
  selected: boolean,
  id: number,
  shouldGoBack: boolean,
  shouldGoForward: boolean,
  visitId: number,
};

type TabsAction = {
  type: OPEN_LINK_ACTION | UPDATE_WEBVIEW_ACTION | URLBAR_QUERY_ACTION |
    GO_BACK_ACTION | GO_FORWARD_ACTION | BACK_FORWARD_RECEIVED_ACTION |
    SWITCH_TAB_ACTION,
  payload: any,
};

export default function tabs(state: Tab[] = [], action: TabsAction) {
  if (action.type === OPEN_LINK_ACTION) {
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
    UPDATE_WEBVIEW_ACTION,
    URLBAR_QUERY_ACTION,
    GO_BACK_ACTION,
    GO_FORWARD_ACTION,
    BACK_FORWARD_RECEIVED_ACTION,
  ].includes(action.type)) {
    const selectedTabIndex = state.findIndex(tab => tab.selected);

    if (selectedTabIndex === -1) {
      return state;
    }

    const selectedTab = state[selectedTabIndex];
    let propsToUpdate = {};

    if (action.type === UPDATE_WEBVIEW_ACTION) {
      propsToUpdate = {
        canGoBack: action.payload.webCanGoBack,
        canGoForward: action.payload.webCanGoForward,
        title: action.payload.pageTitle,
        currentUrl: action.payload.currentUrl,
        visitId: action.payload.timestamp,
      };
    }

    if (action.type === URLBAR_QUERY_ACTION) {
      propsToUpdate = {
        canGoBack: false,
        canGoForward: false,
      };
    }

    if (action.type === GO_BACK_ACTION) {
      propsToUpdate = {
        shouldGoBack: true,
      };
    }

    if (action.type === GO_FORWARD_ACTION) {
      propsToUpdate = {
        shouldGoForward: true,
      };
    }

    if (action.type === BACK_FORWARD_RECEIVED_ACTION) {
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
