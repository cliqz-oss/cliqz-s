import {
  SCREEN_CHANGE_ACTION,
  OPEN_DOMAIN_ACTION,
  SWITCH_TAB_ACTION,
} from '../constants/actions';
import {
  HOME_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screens';

type ScreenAction = {
  type: SCREEN_CHANGE_ACTION | OPEN_DOMAIN_ACTION | SWITCH_TAB_ACTION,
  payload: any,
};

export default function screen(state = HOME_SCREEN, action: ScreenAction) {
  switch (action.type) {
    case SCREEN_CHANGE_ACTION:
      return action.payload || HOME_SCREEN;
    case OPEN_DOMAIN_ACTION:
      return DOMAIN_DETAILS_SCREEN;
    case SWITCH_TAB_ACTION:
      return HOME_SCREEN;
    default:
      return state;
  }
}
