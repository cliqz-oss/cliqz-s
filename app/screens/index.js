import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
  HOME_SCREEN,
  DOMAIN_LIST_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';
import Home from './Home';
import DomainList from './DomainList';
import DomainDetails from './DomainDetails';

// eslint-disable-next-line
const fakeIcon = require('../../ios/CliqzS/Images.xcassets/AppIcon.appiconset/App_Icon-BETA@80-1.png');

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
      // Not sure why, but `tabBarHidden` does not work for first screen
      this.props.navigator.toggleTabs({
        to: 'hidden',
        animated: false,
      });

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
}
