import {
  TypeKeys,
  ActionTypes,
} from '../constants/actions';
import {
  HOME_SCREEN,
  DOMAIN_DETAILS_SCREEN,
  BEACONS_LIST_SCREEN,
} from '../constants/screens';

export const initialState = HOME_SCREEN;

export default function screen(state = initialState, action: ActionTypes) {
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
