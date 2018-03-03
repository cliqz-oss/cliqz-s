import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'browser-core/build/modules/mobile-cards/components/partials/Icon';

const data = [
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    padding: 10,
    flexDirection: 'row',
  },
  rowText: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
});

export default class Drawer extends Component {
  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row}>
      <Icon url='https://cliqz.com' />
      <View style={styles.rowText}>
        <Text>{item.domain}</Text>
        <Text>{item.lastVisisted}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <FlatList
          data={data}
          inverted
          renderItem={this.renderItem}
          style={styles.list}
          testID='Drawer'
        />
      </SafeAreaView>
    );
  }
}
