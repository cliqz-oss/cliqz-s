import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';
import { History } from '../models/history';

export const initialState: History[] = [];

export default function domains(state = initialState, action: ActionTypes): History[] {
  switch (action.type) {
    case TypeKeys.SET_HISTORY_ACTION:
      return action.payload;
    default:
      return state;
  }
}
