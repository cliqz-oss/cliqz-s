import { OPEN_LINK } from '../constants/action-types';

export default function url(state = '', action) {
  if (action.type === OPEN_LINK) {
    return action.payload.url;
  }
  return state;
}
