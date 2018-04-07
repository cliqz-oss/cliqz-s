import {
  TypeKeys,
  ActionTypes,
} from '../constants/actions';
import {
  HOME_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screens';

export default function screen(state = HOME_SCREEN, action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.SCREEN_CHANGE_ACTION:
      return action.payload || HOME_SCREEN;
    case TypeKeys.OPEN_DOMAIN_ACTION:
      return DOMAIN_DETAILS_SCREEN;
    case TypeKeys.SWITCH_TAB_ACTION:
      return HOME_SCREEN;
    default:
      return state;
  }
}
