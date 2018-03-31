import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
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
import { BACKGROUND_COLOR_STYLE } from '../constants/stylesheets';

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
});

class Home extends Component {
  modalHeight() {
    return {
      height: this.props.mode === 'search' ? Dimensions.get('window').height : 0,
    };
  }

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
      <Browser
        url={this.props.url}
        backForwardReceiver={this.props.backForwardReceiver}
        updateWebView={this.props.updateWebView}
        shouldGoBack={this.props.shouldGoBack}
        shouldGoForward={this.props.shouldGoForward}
      />
      <SafeAreaView style={[styles.modal, this.modalHeight()]}>
        <SearchResults
          query={this.props.query}
          openLink={this.props.openLink}
        />
      </SafeAreaView>
      <UrlBar navigator={this.props.navigator} />
    </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({
  query,
  url,
  mode,
  webView,
}) => ({
  query,
  mode,
  url,
  shouldGoBack: webView.shouldGoBack,
  shouldGoForward: webView.shouldGoForward,
});

const mapDispatchToProps = dispatch => ({
  updateWebView: (...args) => dispatch(updateWebView(...args)),
  openLink: url => dispatch(openLink(url)),
  backForwardReceiver: () => dispatch(backForwardReceiver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
