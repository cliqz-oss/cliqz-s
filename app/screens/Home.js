import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import UrlBar from '../components/UrlBar';
import Browser from '../components/Browser';
import SearchResults from '../components/SearchResults';
import {
  updateWebView,
  openLink,
  backForwardReceiver,
} from '../actions/index';
import { BACKGROUND_COLOR_STYLE } from '../constants/styles';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: BACKGROUND_COLOR_STYLE,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  tabsContainer: {
    flex: 1,
  },
});

class Home extends Component {
  _modalHeight() {
    return {
      height: this.props.mode === 'search' ? Dimensions.get('window').height : 0,
    };
  }

  _renderTab = tab => (
    <View
      key={tab.id}
      style={{ flex: tab.selected ? 1 : 0, height: tab.selected ? undefined : 0 }}
    >
      <Browser
        url={tab.url}
        backForwardReceiver={this.props.backForwardReceiver}
        updateWebView={this.props.updateWebView}
        shouldGoBack={tab.shouldGoBack}
        shouldGoForward={tab.shouldGoForward}
      />
    </View>
  );

  render() {
    const keyboardAvoidingViewOptions = {};

    if (Platform.OS === 'ios') {
      keyboardAvoidingViewOptions.behavior = 'padding';
    }

    return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      {...keyboardAvoidingViewOptions}
    >
      <View style={styles.tabsContainer}>
        {this.props.tabs.map(this._renderTab)}
      </View>
      <SafeAreaView style={[styles.modal, this._modalHeight()]}>
        <SearchResults
          query={this.props.query}
          openLink={this.props.openLink}
        />
      </SafeAreaView>
      <UrlBar />
    </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({
  query,
  mode,
  tabs,
}) => ({
  query,
  mode,
  tabs,
});

export default connect(mapStateToProps, {
  updateWebView,
  openLink,
  backForwardReceiver,
})(Home);
