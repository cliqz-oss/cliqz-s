export default function query(state = '', action) {
  if (action.type === 'UPDATE_URLBAR') {
    return action.payload.query;
  }
  if (action.type === 'URLBAR_QUERY') {
    return action.payload.query;
  }
  return state;
}
