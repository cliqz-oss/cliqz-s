import {
  ActionTypes,
  TypeKeys,
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

export default function tabs(state: Tab[] = [], action: ActionTypes) {
  if (action.type === TypeKeys.OPEN_LINK_ACTION) {
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

  if (action.type === TypeKeys.SWITCH_TAB_ACTION) {
    return [
      ...state.map(tab => ({
        ...tab,
        selected: action.payload === tab.visitId,
      })),
    ];
  }

  // Those actions update tab state
  if ([
    TypeKeys.UPDATE_WEBVIEW_ACTION,
    TypeKeys.URLBAR_QUERY_ACTION,
    TypeKeys.GO_BACK_ACTION,
    TypeKeys.GO_FORWARD_ACTION,
    TypeKeys.BACK_FORWARD_RECEIVED_ACTION,
  ].includes(action.type)) {
    const selectedTabIndex = state.findIndex(tab => tab.selected);

    if (selectedTabIndex === -1) {
      return state;
    }

    const selectedTab = state[selectedTabIndex];
    let propsToUpdate = {};

    if (action.type === TypeKeys.UPDATE_WEBVIEW_ACTION) {
      propsToUpdate = {
        canGoBack: action.payload.webCanGoBack,
        canGoForward: action.payload.webCanGoForward,
        title: action.payload.pageTitle,
        currentUrl: action.payload.currentUrl,
        visitId: action.payload.timestamp,
      };
    }

    if (action.type === TypeKeys.URLBAR_QUERY_ACTION) {
      propsToUpdate = {
        canGoBack: false,
        canGoForward: false,
      };
    }

    if (action.type === TypeKeys.GO_BACK_ACTION) {
      propsToUpdate = {
        shouldGoBack: true,
      };
    }

    if (action.type === TypeKeys.GO_FORWARD_ACTION) {
      propsToUpdate = {
        shouldGoForward: true,
      };
    }

    if (action.type === TypeKeys.BACK_FORWARD_RECEIVED_ACTION) {
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
