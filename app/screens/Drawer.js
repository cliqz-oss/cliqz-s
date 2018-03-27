import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Logo } from '../cliqz';
import { openLink, fetchHistory } from '../actions/index';

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
  constructor(props) {
    super(props);
    this.listener = new ScreenVisibilityListener({
      willAppear: ({ screen }) => {
        if (screen === 'cliqzs.Drawer') {
          this.props.fetchHistory();
        }
      },
    });
  }

  onPressItem = (url) => {
    this.props.openLink(url);
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'close',
    });
  };

  renderItem = ({ item }) => (
    <DrawerItem
      lastVisisted={item.lastVisisted}
      domain={item.domain}
      baseUrl={item.baseUrl}
      onPressItem={this.onPressItem}
    />
  );

  componentDidMount() {
    this.listener.register();
  }

  render() {
    console.log(this.props.domains);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.domains}
          inverted
          renderItem={this.renderItem}
          keyExtractor={item => item.lastVisisted.toString()}
          style={styles.list}
          testID='Drawer'
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.domains,
});

export default connect(mapStateToProps, { openLink, fetchHistory })(Drawer);
