import { SCREEN_CHANGED } from '../constants/action-types';
import { DOMAIN_LIST_SCREEN as HOME_SCREEN} from '../constants/screen-names';

export default function screen(state = HOME_SCREEN, action) {
  if (action.type === SCREEN_CHANGED) {
    return action.payload || HOME_SCREEN;
  }

  return state;
}