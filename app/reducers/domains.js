import { SET_HISTORY } from '../constants/action-types';

export default function domains(state = [], action) {
  if (action.type === SET_HISTORY) {
    return action.payload;
  }
  return state;
}
