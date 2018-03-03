/* eslint-disable react/no-string-refs */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import UrlBar from '../components/UrlBar';
import SearchResults from '../components/SearchResults';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'search',
      query: '',
      webCanGoBack: false,
      webCanGoForward: false,
    };
    this.history = {
      stack: [],
      index: 0,
    };
  }

  /*
  componentWillMount() {
    this.props.navigation.navigate('DrawerOpen');
  }
  */

  pushHistory() {
    if (this.history.index < this.history.stack.length) {
      this.history.stack = this.history.stack.slice(0, this.history.index);
    }
    this.history.index = this.history.stack.push(this.state);
  }

  goBack() {
    if (this.state.webCanGoBack && this.webView) {
      this.webView.goBack();
    } else {
      // stash current state
      if (this.history.index === this.history.stack.length) {
        this.pushHistory();
      }
      this.history.index -= 1;
      this.setState(this.history.stack[this.history.index]);
    }
  }

  goForward() {
    if (this.state.webCanGoForward && this.webView) {
      this.webView.goForward();
    } else {
      this.history.index += 1;
      this.setState(this.history.stack[this.history.index]);
    }
  }

  openLink = (url) => {
    this.pushHistory();
    this.setState({ mode: 'visit', url });
  };

  onNavigationStateChange = (state) => {
    this.setState({
      pageTitle: state.title,
      url: state.url,
      webCanGoBack: state.canGoBack,
      webCanGoForward: state.canGoForward,
    });
  };

  render() {
    const {
      mode,
      query,
      url,
      pageTitle,
      webCanGoBack,
      webCanGoForward,
    } = this.state;
    const canGoBack = webCanGoBack || this.history.index > 0;
    const canGoForward = webCanGoForward || this.history.index < this.history.stack.length;

    return (
      <View style={styles.container}>
        {mode === 'search' &&
          <SearchResults
            query={query}
            openLink={this.openLink}
          />
        }
        {mode === 'visit' &&
          <WebView
            ref={(el) => { this.webView = el; }}
            source={{ uri: this.state.url }}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        }
        <UrlBar
          query={query}
          url={url}
          pageTitle={pageTitle}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          mode={mode}
          setState={this.setState.bind(this)}
          goBack={this.goBack.bind(this)}
          goForward={this.goForward.bind(this)}
          onTouch={() => this.setState({ mode: 'search', query: url })}
        />
      </View>
    );
  }
}
