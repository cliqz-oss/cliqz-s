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

class AppContainer extends Component {
  constructor() {
    super();
    this.historyNotification = new HistoryNotification();
    this.historyNotification.on('history', (/* ...args */) => {
      // TODO: record history
    });
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    this.historyNotification.init();
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
    this.setState({ isReady: true });
  }

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
}

AppRegistry.registerComponent('CliqzS', () => AppContainer);
