import 'react-native/Libraries/Core/InitializeCore';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { startup } from './app/cliqz';
import configureStore from './app/store';
import { initialize as startHistoryService } from './app/services/history';
import registerScreens, { tabs } from './app/screens/index';

// console.disableYellowBox = true;
// eslint-disable-next-line
console.ignoredYellowBox = [
  'Setting a timer',
];


(async function startApp() {
  const store = configureStore();

  registerScreens(store, Provider);

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

  Navigation.startTabBasedApp({
    tabs,
    appStyle: {
      tabBarHidden: true,
    },
    passProps: {},
    animationType: 'slide-down',
  });
}());

/*
import HistoryNotification from './app/services/history-notifications';
historyNotification = new HistoryNotification();
historyNotification.on('history', () => {
});
*/
