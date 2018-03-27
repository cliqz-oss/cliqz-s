import 'react-native/Libraries/Core/InitializeCore';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './app/navigators/app-navigator';
import HistoryNotification from './app/services/history-notifications';
import { startup } from './app/cliqz';
import configureStore from './app/store';
import { initialize as startHistoryService } from './app/services/history';

import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';


/* eslint-disable */
// console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Setting a timer'
];
/* eslint-enable */

const styles = () => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#FFFFFF',
  },
});

const store = configureStore();

registerScreens(store, Provider); // this is where you register all of your app's screens

// TODO: follow up this example https://github.com/wix/react-native-navigation/blob/master/old-example-redux/src/app.js
class AppContainer extends Component {
  constructor() {
    super();
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch({
      type: 'APP_START'
    });
    this.historyNotification = new HistoryNotification();
    this.historyNotification.on('history', (/* ...args */) => {
      // TODO: record history
    });

  }

  async onStoreUpdate() {
    if (!this.isStarted) {
      this.isStarted = true;
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
      this.startApp();
    }
  }


  startApp(root) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Home',
          screen: 'cliqzs.Home', // this is a registered name for a screen
          title: 'Screen One'
        },
      ]
    });
  }

/*
  render() {
    const keyboardAvoidingViewOptions = {};

    if (Platform.OS === 'ios') {
      keyboardAvoidingViewOptions.behavior = 'padding';
    }
    return (
      <Provider store={store}>
        <KeyboardAvoidingView
          style={styles().container}
          {...keyboardAvoidingViewOptions}
        >
          {this.state.isReady ?
            <AppWithNavigationState />
            :
            <Text>Loading</Text>
          }
        </KeyboardAvoidingView>
      </Provider>
    );
  }
  */
}

const app = new AppContainer();