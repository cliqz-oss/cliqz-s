import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';

export const initialState: string = '';

export default function query(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.URLBAR_BLUR_ACTION:
      return '';
    case TypeKeys.UPDATE_URLBAR_ACTION:
      return action.payload.query;
    case TypeKeys.URLBAR_QUERY_ACTION:
      return action.payload.query;
    default:
      return state;
  }
}
