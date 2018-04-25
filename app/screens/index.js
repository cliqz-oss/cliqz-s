import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
  HOME_SCREEN,
  DOMAIN_LIST_SCREEN,
  DOMAIN_DETAILS_SCREEN,
  BEACONS_LIST_SCREEN,
} from '../constants/screens';
import Home from './Home';
import DomainList from './DomainList';
import DomainDetails from './DomainDetails';
import BeaconsList from './BeaconsList';

// eslint-disable-next-line
const fakeIcon = require('../../assets/1x1-00000000.png');

const navigatorStyle = {
  navBarHidden: true,
  tabBarHidden: true,
  drawUnderTabBar: true,
  statusBarTextColorScheme: 'light',
};

export const tabs = [
  {
    screen: HOME_SCREEN,
    icon: fakeIcon,
    navigatorStyle,
  },
  {
    screen: DOMAIN_LIST_SCREEN,
    icon: fakeIcon,
    navigatorStyle,
  },
  {
    screen: DOMAIN_DETAILS_SCREEN,
    icon: fakeIcon,
    navigatorStyle,
  },
  {
    screen: BEACONS_LIST_SCREEN,
    icon: fakeIcon,
    navigatorStyle,
  },
];

const wrapper = (WrappedComponent) => {
  // eslint-disable-next-line
  const wrappedComponent = class extends Component {
    static navigatorStyle = navigatorStyle;

    componentWillReceiveProps(nextProps) {
      if (this.currentScreen !== nextProps.screen) {
        const tabIndex = tabs.findIndex(t => t.screen === nextProps.screen);
        this.props.navigator.switchToTab({
          tabIndex,
        });
      }
    }

    render() {
      this.currentScreen = this.props.screen;
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(s => ({ screen: s.screen }), {})(wrappedComponent);
};

export default function registerScreens(store, Provider) {
  const register = (name, component) => Navigation.registerComponent(
    name,
    () => wrapper(component),
    store,
    Provider,
  );
  register(HOME_SCREEN, Home);
  register(DOMAIN_LIST_SCREEN, DomainList);
  register(DOMAIN_DETAILS_SCREEN, DomainDetails);
  register(BEACONS_LIST_SCREEN, BeaconsList);
}
