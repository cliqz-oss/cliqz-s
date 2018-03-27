import 'react-native/Libraries/Core/InitializeCore';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { startup } from './app/cliqz';
import configureStore from './app/store';
import { initialize as startHistoryService } from './app/services/history';
import registerScreens from './app/screens/index';

/* eslint-disable */
// console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Setting a timer'
];
/* eslint-enable */

function startApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'cliqzs.Home', // this is a registered name for a screen
      navigatorStyle: {
        navBarHidden: true,
      },
      navigatorButtons: {},
    },
    drawer: {
      left: {
        screen: 'cliqzs.Drawer',
        passProps: {},
        disableOpenGesture: false,
        fixedWidth: 500,
      },
    },
    passProps: {},
    animationType: 'slide-down',
  });
}

let isStarted = false;

async function onStoreUpdate() {
  if (!isStarted) {
    isStarted = true;
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
    startApp();
  }
}

const store = configureStore();

registerScreens(store, Provider);

store.subscribe(onStoreUpdate);
store.dispatch({
  type: 'APP_START',
});

/*
import HistoryNotification from './app/services/history-notifications';
historyNotification = new HistoryNotification();
historyNotification.on('history', () => {
});
*/
