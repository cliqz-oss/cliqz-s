import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Browser from './Browser';

const styles = function () {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#FFFFFF'
    },
  });
};

// wrapper for a component to add top padding on iOS
function AppContainer(App) {
  return () => (
    <View style={styles().container}>
      <App />
    </View>
  );
}

AppRegistry.registerComponent('CliqzS', () => AppContainer(Browser));