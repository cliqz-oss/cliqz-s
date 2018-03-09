import {
  URLBAR_BLUR,
  URLBAR_QUERY,
  UPDATE_URLBAR,
  OPEN_LINK,
} from '../constants/action-types';

export default function mode(state = 'search', action) {
  if (action.type === URLBAR_BLUR) {
    return action.payload.mode;
  }
  if (action.type === URLBAR_QUERY) {
    return 'search';
  }
  if (action.type === UPDATE_URLBAR) {
    return 'search';
  }
  if (action.type === OPEN_LINK) {
    return 'visit';
  }
  return state;
}
