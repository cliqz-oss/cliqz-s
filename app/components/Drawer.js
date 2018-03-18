import React, { Component } from 'react';
import Moment from 'react-moment';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Logo } from '../cliqz';
import {
  openLink,
  fetchHistory,
} from '../actions/index';

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

class Drawer extends Component {
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => this.props.openLink(item.baseUrl)}
    >
      <Logo url={item.baseUrl}/>
      <View style={styles.rowText}>
        <Text>{item.domain}</Text>
        <Moment
          element={Text}
          fromNow
        >
          {item.lastVisisted / 1000}
        </Moment>
      </View>
    </TouchableOpacity>
  );

  componentWillMount() {
    this.props.fetchHistory();
  }

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <FlatList
          data={this.props.domains}
          inverted
          renderItem={this.renderItem}
          keyExtractor={item => item.lastVisisted.toString()}
          style={styles.list}
          testID='Drawer'
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.domains,
});

export default connect(mapStateToProps, { openLink, fetchHistory })(Drawer);
