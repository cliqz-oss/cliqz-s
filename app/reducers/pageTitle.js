export default function pageTitle(state = '', action) {
  if (action.type === 'UPDATE_WEBVIEW') {
    return action.payload.pageTitle;
  }
  return state;
}
