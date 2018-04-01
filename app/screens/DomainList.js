import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { connect } from 'react-redux';
import {
  Logo,
  parseURL,
} from '../cliqz';
import {
  fetchDomains,
  openDomain,
} from '../actions/index';
import { DOMAIN_LIST_SCREEN } from '../constants/screen-names';
import HomeButton from '../components/HomeButton';
import {
  FONT_COLOR_STYLE,
  BACKGROUND_COLOR_STYLE,
  BOTTOM_BAR_HEIGHT_STYLE,
} from '../constants/stylesheets';

const itemWithTabsBackgroundColor = '#31325b';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_STYLE,
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
    const additionalStyle = {
      backgroundColor: this.props.isActive ? itemWithTabsBackgroundColor : undefined,
    };
    return (
      <TouchableOpacity
        style={[styles.row, additionalStyle]}
        onPress={this.onPress}
      >
        <Logo
          url={this.props.baseUrl}
        />
        <View style={styles.rowText}>
          <Text style={{ color: FONT_COLOR_STYLE }}>{this.props.domain}</Text>
          <Moment
            style={{ color: FONT_COLOR_STYLE }}
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
        if (screen === DOMAIN_LIST_SCREEN) {
          this.props.fetchDomains();
        }
      },
    });
  }

  onPressItem = (domain) => {
    this.props.openDomain(domain);
  };

  _renderItem = ({ item }) => (
    <DrawerItem
      lastVisisted={item.lastVisisted}
      domain={item.domain}
      baseUrl={item.baseUrl}
      onPressItem={this.onPressItem}
      isActive={item.isActive}
    />
  );

  componentDidMount() {
    this.listener.register();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.domains}
          inverted
          renderItem={this._renderItem}
          keyExtractor={item => item.lastVisisted.toString()}
          style={styles.list}
          testID='Drawer'
        />
        <View style={{
          height: BOTTOM_BAR_HEIGHT_STYLE,
          flexDirection: 'row',
        }}>
          <View style={{ flex: 1 }} />
          <HomeButton />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const openedDomains = state.tabs.map(tab => parseURL(tab.url).hostname);
  return {
    domains: state.domains.map(domain => ({
      ...domain,
      isActive: openedDomains.includes(domain.domain),
    })),
  };
};

export default connect(mapStateToProps, {
  fetchDomains,
  openDomain,
})(Drawer);
