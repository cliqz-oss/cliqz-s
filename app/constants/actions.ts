import { History } from '../models/history';
import { Message } from '../models/message';
import { Beacon } from '../models/beacon';

export enum TypeKeys {
  BACK_FORWARD_RECEIVED_ACTION,
  GO_BACK_ACTION,
  GO_FORWARD_ACTION,
  OPEN_DOMAIN_ACTION,
  OPEN_LINK_ACTION,
  SCREEN_CHANGE_ACTION,
  SET_HISTORY_ACTION,
  SET_MESSAGES_ACTION,
  SWITCH_TAB_ACTION,
  UPDATE_URLBAR_ACTION,
  UPDATE_WEBVIEW_ACTION,
  URLBAR_BLUR_ACTION,
  URLBAR_QUERY_ACTION,
  BEACONS_IN_RANGE,
  OTHER_ACTION,
}

export interface BackForwardReceivedAction {
  type: TypeKeys.BACK_FORWARD_RECEIVED_ACTION;
}

export interface GoBackAction {
  type: TypeKeys.GO_BACK_ACTION;
}

export interface GoForwardAction {
  type: TypeKeys.GO_FORWARD_ACTION;
}

export interface SetHistoryAction {
  type: TypeKeys.SET_HISTORY_ACTION;
  payload: History[];
}

export interface SetMessagesAction {
  type: TypeKeys.SET_MESSAGES_ACTION;
  payload: Message[];
}

export interface OpenDomainAction {
  type: TypeKeys.OPEN_DOMAIN_ACTION;
}

export interface OpenLinkAction {
  type: TypeKeys.OPEN_LINK_ACTION;
  payload: {
    url: string;
  };
}

export interface ScreenChangeAction {
  type: TypeKeys.SCREEN_CHANGE_ACTION;
  payload: string;
}

export interface UpdateUrlbarAction {
  type: TypeKeys.UPDATE_URLBAR_ACTION;
  payload: {
    query: string;
  };
}

export interface UpdateWebviewAction {
  type: TypeKeys.UPDATE_WEBVIEW_ACTION;
  payload: {
    webCanGoBack: boolean;
    webCanGoForward: boolean;
    pageTitle: string;
    currentUrl: string;
    timestamp: number;
    isLoading: boolean;
  };
}

export interface UrlbarBlurAction {
  type: TypeKeys.URLBAR_BLUR_ACTION;
  payload: {
    mode: string;
  };
}

export interface UrlbarQueryAction {
  type: TypeKeys.URLBAR_QUERY_ACTION;
  payload: {
    query: string;
  };
}

export interface SwitchTabAction {
  type: TypeKeys.SWITCH_TAB_ACTION;
  payload: number;
}

export interface BeaconsInRange {
  type: TypeKeys.BEACONS_IN_RANGE;
  payload: Beacon[];
}

export interface OtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes =
  | BackForwardReceivedAction
  | GoBackAction
  | GoForwardAction
  | OpenDomainAction
  | OpenLinkAction
  | ScreenChangeAction
  | SetHistoryAction
  | SetMessagesAction
  | SwitchTabAction
  | UpdateUrlbarAction
  | UpdateWebviewAction
  | UrlbarBlurAction
  | UrlbarQueryAction
  | OtherAction;
