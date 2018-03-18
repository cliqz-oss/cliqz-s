import { AppNavigator } from '../navigators/app-navigator';

export default function navReducer(state, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined
  return nextState || state;
}
