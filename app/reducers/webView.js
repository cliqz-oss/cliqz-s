export default function webView(state = { canGoBack: false, canGoForward: false }, action) {
  if (action.type === 'UPDATE_WEBVIEW') {
    return {
      canGoBack: action.payload.webCanGoBack,
      canGoForward: action.payload.webCanGoForward,
    };
  }

  if (action.type === 'URLBAR_QUERY') {
    return {
      canGoBack: false,
      canGoForward: false,
    };
  }
  return state;
}
