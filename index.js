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
import Router from './app/config/router';
import HistoryNotification from './app/services/history-notifications';
import { startup } from './app/cliqz';
import configureStore from './app/store';

/* eslint-disable */
console.disableYellowBox = true;
/* eslint-enable */

const styles = () => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#FFFFFF',
  },
});

const store = configureStore();

// wrapper for a component to add top padding on iOS
class AppContainer extends Component {
  constructor() {
    super();
    this.historyNotification = new HistoryNotification();
    this.historyNotification.on('history', (/* ...args */) => {
      // TODO: record history
    });
    this.state = {
      isCliqzLoaded: false,
    };
  }

  componentWillMount() {
    this.historyNotification.init();
    startup.then(() => this.setState({ isCliqzLoaded: true }));
  }

  render() {
    return (
      <Provider store={store}>
        <KeyboardAvoidingView
          style={styles().container}
          behavior={Platform.OS === 'ios' ? 'padding' : false}
        >
          {this.state.isCliqzLoaded ?
            <Router />
            :
            <Text>Loading</Text>
          }
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('CliqzS', () => AppContainer);
