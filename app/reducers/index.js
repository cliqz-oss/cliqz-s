import fixtures from '../config/data';

const initialState = {
  ...fixtures,
  query: '',
  url: '',
  currentUrl: '',
  pageTitle: '',
  mode: 'search',
  webCanGoBack: false,
  webCanGoForward: false,
  history: {
    stack: [],
    index: 0,
  },
};
const rootReducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_WEBVIEW') {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === 'UPDATE_URLBAR') {
    return {
      ...state,
      mode: 'search',
      query: action.payload.query,
    };
  }
  if (action.type === 'URLBAR_BLUR') {
    return {
      ...state,
      mode: action.payload.mode,
    };
  }
  if (action.type === 'OPEN_LINK') {
    return {
      ...state,
      mode: 'visit',
      url: action.payload.url,
    };
  }
  if (action.type === 'URLBAR_QUERY') {
    return {
      ...state,
      mode: 'search',
      query: action.payload.query,
      webCanGoBack: false,
      webCanGoForward: false,
    };
  }
  return state;
};


export default rootReducer;

