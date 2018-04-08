import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';
import { Message } from '../models/message';

export const initialState: Message[] = [];

export default function messages(state = initialState, action: ActionTypes): Message[] {
  switch (action.type) {
    case TypeKeys.OPEN_DOMAIN_ACTION:
      return [];
    case TypeKeys.SET_MESSAGES_ACTION:
      return action.payload;
    default:
      return state;
  }
}
