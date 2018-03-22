import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Logo } from '../cliqz';
import { openLink } from '../actions/index';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
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

class DrawerItem extends PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.baseUrl);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={this.onPress}
      >
        <Logo
          url={this.props.baseUrl}
        />
        <View style={styles.rowText}>
          <Text style={{ color: 'white' }}>{this.props.domain}</Text>
          <Moment
            style={{ color: 'white' }}
            element={Text}
            fromNow
          >
            {this.props.lastVisisted / 1000}
          </Moment>
        </View>
      </TouchableOpacity>
    );
  }
}

class Drawer extends PureComponent {
  onPressItem = (url) => {
    this.props.openLink(url);
    this.props.navigation.navigate('DrawerClose');
  };

  renderItem = ({ item }) => (
    <DrawerItem
      lastVisisted={item.lastVisisted}
      domain={item.domain}
      baseUrl={item.baseUrl}
      onPressItem={this.onPressItem}
    />
  );

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

export default connect(mapStateToProps, { openLink })(Drawer);
