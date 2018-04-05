import { SET_HISTORY_ACTION } from '../constants/actions';

type DomainsAction = { type: SET_HISTORY_ACTION, payload: any };

export default function domains(state = [], action: DomainsAction) {
  switch (action.type) {
    case SET_HISTORY_ACTION:
      return action.payload;
    default:
      return state;
  }
}
