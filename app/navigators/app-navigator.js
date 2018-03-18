import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addListener } from '../utils/redux';
import Home from '../screens/Home';
import Drawer from '../screens/Drawer';
import { fetchHistory } from '../actions/index';

export const AppNavigator = DrawerNavigator({
  Home: {
    screen: Home,
  },
}, {
  contentComponent: Drawer,
});

class AppWithNavigationState extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.nav.index === 1) {
      this.props.dispatch(fetchHistory());
    }
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
