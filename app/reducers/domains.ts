import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';

export default function domains(state = [], action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.SET_HISTORY_ACTION:
      return action.payload;
    default:
      return state;
  }
}
