import {
  ActionsTypes,
  SetHistoryAction,
} from '../constants/actions';

type DomainsAction = SetHistoryAction;

export default function domains(state = [], action: DomainsAction) {
  switch (action.type) {
    case ActionsTypes.SET_HISTORY_ACTION:
      return action.payload;
    default:
      return state;
  }
}
