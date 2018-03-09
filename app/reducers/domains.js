import moment from 'moment';
import fixtures from '../config/data';
import { parseURL } from '../cliqz';
import { UPDATE_WEBVIEW } from '../constants/action-types';

export default function domains(state = fixtures.domains, action) {
  if (action.type === UPDATE_WEBVIEW) {
    const url = action.payload.currentUrl;
    const parsedUrl = parseURL(url);

    // some urls like about:black cannot be parsed and should not be recorded
    if (!parsedUrl) {
      return state;
    }

    return [
      {
        domain: parsedUrl.hostname,
        baseUrl: url,
        lastVisisted: moment().fromNow(),
      },
      ...state,
    ];
  }
  return state;
}
