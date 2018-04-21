import { Dispatch } from 'redux';
import {
  fetchDomains as getDomains,
  fetchMessages as getMessages,
  recordVisit,
} from '../services/history';
import { Beacon } from '../models/beacon';
import {
  TypeKeys,
  BackForwardReceivedAction,
  BeaconsInRange,
  GoBackAction,
  GoForwardAction,
  OpenDomainAction,
  OpenLinkAction,
  ScreenChangeAction,
  SetHistoryAction,
  SetMessagesAction,
  SwitchTabAction,
  UpdateUrlbarAction,
  UpdateWebviewAction,
  UrlbarBlurAction,
  UrlbarQueryAction,
} from '../constants/actions';
import { AppState } from '../app-state';
import { History } from '../models/history';
import { Message } from '../models/message';

const setHistory = (payload: History[]): SetHistoryAction => ({
  payload,
  type: TypeKeys.SET_HISTORY_ACTION,
});

const setMessages = (payload: Message[]): SetMessagesAction => ({
  payload,
  type: TypeKeys.SET_MESSAGES_ACTION,
});

export const openDomain = (
  domain: string,
) => async (dispatch: Dispatch<any>): Promise<SetMessagesAction> => {
  dispatch({
    type: TypeKeys.OPEN_DOMAIN_ACTION,
  });

  let messages: Message[] = [];

  try {
    messages = await getMessages(domain);
  } catch (e) {
    // TODO: report errors
  }

  return dispatch(setMessages(messages));
};

export const fetchDomains = () => async (dispatch: Dispatch<any>): Promise<SetHistoryAction> => {
  const history = await getDomains();
  return dispatch(setHistory(history));
};

interface IWebViewState {
  pageTitle?: string;
  currentUrl?: string;
  webCanGoBack?: boolean;
  webCanGoForward?: boolean;
  isLoading?: boolean;
}

export type updateWebView = (params: IWebViewState) => void;

export const updateWebView = ({
  pageTitle = '',
  currentUrl = '',
  webCanGoBack,
  webCanGoForward,
  isLoading,
}: IWebViewState) => async (dispatch: Dispatch<any>) => {
  const timestamp = Date.now() * 1000;

  dispatch({
    type: TypeKeys.UPDATE_WEBVIEW_ACTION,
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

export const urlBarBlur = (url: string): UrlbarBlurAction => ({
  type: TypeKeys.URLBAR_BLUR_ACTION,
  payload: {
    mode: url ? 'visit' : 'search',
  },
});

export const urlBarQuery = (query: string): UrlbarQueryAction => ({
  type: TypeKeys.URLBAR_QUERY_ACTION,
  payload: {
    query,
  },
});

export const updateUrlBar = (query: string): UpdateUrlbarAction => ({
  type: TypeKeys.UPDATE_URLBAR_ACTION,
  payload: {
    query,
  },
});

export const openLink = (url: string): OpenLinkAction => ({
  type: TypeKeys.OPEN_LINK_ACTION,
  payload: {
    url,
  },
});

export const goBack = (): GoBackAction => ({
  type: TypeKeys.GO_BACK_ACTION,
});

export const goForward = (): GoForwardAction => ({
  type: TypeKeys.GO_FORWARD_ACTION,
});

export type backForwardReceiver = () => BackForwardReceivedAction;

export const backForwardReceiver = (): BackForwardReceivedAction => ({
  type: TypeKeys.BACK_FORWARD_RECEIVED_ACTION,
});

export const changeScreen = (screen: string): ScreenChangeAction => ({
  type: TypeKeys.SCREEN_CHANGE_ACTION,
  payload: screen,
});

export const switchTab = (visitId: number): SwitchTabAction => ({
  type: TypeKeys.SWITCH_TAB_ACTION,
  payload: visitId,
});

export const recordBeaconsInRange = (beacons: Beacon[]): BeaconsInRange => ({
  type: TypeKeys.BEACONS_IN_RANGE,
  payload: beacons,
});
