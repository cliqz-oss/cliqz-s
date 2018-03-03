import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Logo } from '../cliqz';
import data from '../config/data';

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
      <Logo url={item.baseUrl}/>
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
          data={data.domains}
          inverted
          renderItem={this.renderItem}
          style={styles.list}
          testID='Drawer'
        />
      </SafeAreaView>
    );
  }
}
