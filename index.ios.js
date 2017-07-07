import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Search from './Search';

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

AppRegistry.registerComponent('CliqzS', () => AppContainer(Search));