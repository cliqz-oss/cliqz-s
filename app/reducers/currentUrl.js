export default function currentUrl(state = '', action) {
  if (action.type === 'UPDATE_WEBVIEW') {
    return action.payload.currentUrl;
  }
  return state;
}
