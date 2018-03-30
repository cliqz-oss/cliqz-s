import {
  SET_MESSAGES_ACTION,
  OPEN_DOMAIN_ACTION,
} from '../constants/action-types';

export default function messages(state = [], action) {
  if (action.type === OPEN_DOMAIN_ACTION) {
    return [];
  }

  if (action.type === SET_MESSAGES_ACTION) {
    return action.payload;
  }

  return state;
}
