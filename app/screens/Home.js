import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import UrlBar from '../components/UrlBar';
import SearchResults from '../components/SearchResults';
import {
  updateWebView,
  openLink,
  backForwardReceiver,
} from '../actions/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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

/* eslint-disable */
const injectedJavaScript = `(${String(function() {
  var pushState = window.history.pushState;
  var replaceState = window.history.replaceState;

  window.history.pushState = function (state, title, url) {
    pushState.apply(this, arguments);
    window.postMessage({
      pushState: true,
      state: state,
      title: title,
      url: url
    }, '*');
  };

  window.history.replaceState = function (state, title, url) {
    replaceState.apply(this, arguments);
    window.postMessage({
      replaceState: true,
      state: state,
      title: title,
      url: url
    }, '*');
  };
})})();`;
/* eslint-enable */

class Home extends Component {
  onNavigationStateChange = (state) => {
    this.props.updateWebView({
      pageTitle: state.title,
      currentUrl: state.url,
      webCanGoBack: state.canGoBack,
      isLoading: state.loading,
      webCanGoForward: state.canGoForward,
    });
  };

  onMessage = () => {
    // existance of onMesasge breaks certain pages, eg. twitter.com
  };

  modalHeight() {
    return {
      height: this.props.mode === 'search' ? Dimensions.get('window').height : 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.webView) {
      return;
    }

    if (nextProps.shouldGoBack) {
      this.webView.goBack();
      this.props.backForwardReceiver();
    }

    if (nextProps.shouldGoForward) {
      this.webView.goForward();
      this.props.backForwardReceiver();
    }
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <WebView
          ref={(el) => { this.webView = el; }}
          source={{ uri: this.props.url }}
          onNavigationStateChange={this.onNavigationStateChange}
          injectedJavaScript={injectedJavaScript}
          onMessage={this.onMessage}
        />
        <View style={[styles.modal, this.modalHeight()]}>
          <SearchResults
            query={this.props.query}
            openLink={this.props.openLink}
          />
        </View>
        <UrlBar />
      </View>
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
