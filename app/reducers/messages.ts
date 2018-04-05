import {
  SET_MESSAGES_ACTION,
  OPEN_DOMAIN_ACTION,
} from '../constants/actions';

type MessagesAction = {
  type: SET_MESSAGES_ACTION | OPEN_DOMAIN_ACTION,
  payload: any,
};

export default function messages(state = [], action: MessagesAction) {
  switch (action.type) {
    case OPEN_DOMAIN_ACTION:
      return [];
    case SET_MESSAGES_ACTION:
      return action.payload;
    default:
      return state;
  }
}
