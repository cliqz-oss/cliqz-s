import {
  UPDATE_URLBAR_ACTION,
  URLBAR_QUERY_ACTION,
} from '../constants/actions';

type QueryAction = {
  type: UPDATE_URLBAR_ACTION | URLBAR_QUERY_ACTION,
  payload: any,
};

export default function query(state = '', action: QueryAction) {
  switch (action.type) {
    case UPDATE_URLBAR_ACTION:
      return action.payload.query;
    case URLBAR_QUERY_ACTION:
      return action.payload.query;
    default:
      return state;
  }
}
