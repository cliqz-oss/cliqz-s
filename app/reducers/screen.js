import {
  SCREEN_CHANGED,
  OPEN_DOMAIN_ACTION,
  SWITCH_TAB_ACTION,
} from '../constants/action-types';
import {
  HOME_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';

export default function screen(state = HOME_SCREEN, action) {
  if (action.type === SCREEN_CHANGED) {
    return action.payload || HOME_SCREEN;
  }

  if (action.type === OPEN_DOMAIN_ACTION) {
    return DOMAIN_DETAILS_SCREEN;
  }

  if (action.type === SWITCH_TAB_ACTION) {
    return HOME_SCREEN;
  }

  return state;
}
