import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Browser extends Component {
  onNavigationStateChange = (state) => {
    this.props.updateWebView({
      pageTitle: state.title,
      currentUrl: state.url,
      isLoading: state.loading,
      webCanGoBack: state.canGoBack,
      webCanGoForward: state.canGoForward,
    });
  };

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

  shouldComponentUpdate(nextProps) {
    if (this.props.url !== nextProps.url) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <WebView
        ref={(el) => { this.webView = el; }}
        source={{ uri: this.props.url }}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}
