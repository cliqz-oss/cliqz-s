import {
  SCREEN_CHANGED,
  OPEN_DOMAIN_ACTION,
} from '../constants/action-types';
import {
  DOMAIN_LIST_SCREEN as HOME_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';

export default function screen(state = HOME_SCREEN, action) {
  if (action.type === SCREEN_CHANGED) {
    return action.payload || HOME_SCREEN;
  }

  if (action.type === OPEN_DOMAIN_ACTION) {
    return DOMAIN_DETAILS_SCREEN;
  }

  return state;
}
