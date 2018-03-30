import 'react-native/Libraries/Core/InitializeCore';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { startup } from './app/cliqz';
import configureStore from './app/store';
import { initialize as startHistoryService } from './app/services/history';
import registerScreens from './app/screens/index';

// console.disableYellowBox = true;
// eslint-disable-next-line
console.ignoredYellowBox = [
  'Setting a timer',
];

const store = configureStore();
let currentScreen = store.getState().screen;

const changeScreen = screen => Navigation.startSingleScreenApp({
  screen: {
    screen,
    navigatorButtons: {},
  },
  passProps: {},
  animationType: 'slide-down',
});

const onStoreUpdate = async () => {
  const { screen } = store.getState();
  if (currentScreen !== screen) {
    currentScreen = screen;
    changeScreen(screen);
  }
};

const startApp = async () => {
  const [app] = await Promise.all([
    startup,
    startHistoryService(),
  ]);
  app.modules.anolysis = {
    isReady: () => Promise.resolve(),
    background: {
      actions: {
        handleTelemetrySignal() {},
      },
    },
  };
  changeScreen(currentScreen);
};

registerScreens(store, Provider);
store.subscribe(onStoreUpdate);

startApp();

/*
import HistoryNotification from './app/services/history-notifications';
historyNotification = new HistoryNotification();
historyNotification.on('history', () => {
});
*/
