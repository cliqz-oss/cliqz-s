import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Logo } from '../cliqz';
import { openLink, fetchDomains } from '../actions/index';
import {
  HOME_SCREEN,
  DOMAIN_LIST_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';

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

  goToHome = () => {
    this.props.navigator.resetTo({
      screen: HOME_SCREEN,
    });
  };

  onPressItem = (url) => {
    this.props.navigator.resetTo({
      screen: DOMAIN_DETAILS_SCREEN,
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
        <View>
          <Button
            title="back"
            onPress={this.goToHome}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.domains,
});

export default connect(mapStateToProps, { openLink, fetchDomains })(Drawer);
