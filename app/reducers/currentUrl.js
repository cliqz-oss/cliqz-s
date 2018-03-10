import { UPDATE_WEBVIEW } from '../constants/action-types';

export default function currentUrl(state = '', action) {
  if (action.type === UPDATE_WEBVIEW) {
    return action.payload.currentUrl;
  }
  return state;
}
