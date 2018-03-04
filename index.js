import 'react-native/Libraries/Core/InitializeCore';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Router from './app/config/router';
import { startup } from './app/cliqz';

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

// wrapper for a component to add top padding on iOS
class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      isCliqzLoaded: false,
    };
  }

  componentWillMount() {
    startup.then(() => this.setState({ isCliqzLoaded: true }));
  }

  render() {
    return (
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
    );
  }
}

AppRegistry.registerComponent('CliqzS', () => AppContainer);
