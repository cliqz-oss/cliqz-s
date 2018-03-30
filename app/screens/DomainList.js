import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Logo } from '../cliqz';
import {
  openLink,
  fetchDomains,
  openDomain,
} from '../actions/index';
import {
  HOME_SCREEN,
  DOMAIN_LIST_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';
import HomeButton from '../components/HomeButton';

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
    this.props.onPressItem(this.props.domain);
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

  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.listener = new ScreenVisibilityListener({
      willAppear: ({ screen }) => {
        if (screen === DOMAIN_LIST_SCREEN) {
          this.props.fetchDomains();
        }
      },
    });
  }

  onPressItem = domain => {
    this.props.openDomain(domain);
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
        <View style={{
          height: 50,
          flexDirection: 'row',
        }}>
          <View style={{flex: 1}} />
          <HomeButton />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.domains,
});

export default connect(mapStateToProps, {
  openLink,
  fetchDomains,
  openDomain,
})(Drawer);
