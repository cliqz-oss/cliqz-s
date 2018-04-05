import {
  URLBAR_BLUR_ACTION,
  URLBAR_QUERY_ACTION,
  UPDATE_URLBAR_ACTION,
  OPEN_LINK_ACTION,
} from '../constants/actions';

type ModeAction = {
  type: URLBAR_BLUR_ACTION | URLBAR_QUERY_ACTION | UPDATE_URLBAR_ACTION | OPEN_LINK_ACTION,
  payload: any,
};

export default function mode(state = 'search', action: ModeAction) {
  switch (action.type) {
    case URLBAR_BLUR_ACTION:
      return action.payload.mode;
    case URLBAR_QUERY_ACTION:
      return 'search';
    case UPDATE_URLBAR_ACTION:
      return 'search';
    case OPEN_LINK_ACTION:
      return 'visit';
    default:
      return state;
  }
}
