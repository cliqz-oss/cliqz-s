import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';

export default function messages(state = [], action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.OPEN_DOMAIN_ACTION:
      return [];
    case TypeKeys.SET_MESSAGES_ACTION:
      return action.payload;
    default:
      return state;
  }
}
