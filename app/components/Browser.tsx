import * as React from 'react';
import {
  WebView,
  NavState,
} from 'react-native';

interface IBrowserProps {
  updateWebView: ({}) => {};
  shouldGoBack: boolean;
  shouldGoForward: boolean;
  backForwardReceiver: () => {};
  url: string;
}

export default class Browser extends React.Component <IBrowserProps> {
  webView?: WebView;

  onNavigationStateChange = (state: NavState) => {
    this.props.updateWebView({
      pageTitle: state.title,
      currentUrl: state.url,
      isLoading: state.loading,
      webCanGoBack: state.canGoBack,
      webCanGoForward: state.canGoForward,
    });
  }

  componentWillReceiveProps(nextProps: IBrowserProps) {
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

  shouldComponentUpdate(nextProps: IBrowserProps) {
    if (this.props.url !== nextProps.url) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <WebView
        ref={(el: any) => { this.webView = el; }}
        source={{ uri: this.props.url }}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}
