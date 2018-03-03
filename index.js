import 'react-native/Libraries/Core/InitializeCore';
import { startup } from 'browser-core';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Platform } from 'react-native';
import Router from './app/config/router';

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
      <View style={styles().container}>
        {this.state.isCliqzLoaded ?
          <Router />
          :
          <Text>Loading</Text>
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('CliqzS', () => AppContainer);
