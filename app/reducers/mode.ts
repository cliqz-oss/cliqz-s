import {
  ActionTypes,
  TypeKeys,
} from '../constants/actions';

export const initialState: string = 'search';

export default function mode(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.URLBAR_BLUR_ACTION:
      return action.payload.mode;
    case TypeKeys.URLBAR_QUERY_ACTION:
      return 'search';
    case TypeKeys.UPDATE_URLBAR_ACTION:
      return 'search';
    case TypeKeys.OPEN_LINK_ACTION:
      return 'visit';
    default:
      return state;
  }
}
