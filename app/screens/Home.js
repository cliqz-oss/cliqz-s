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

class Home extends Component {
  componentWillMount() {
    this.props.navigation.navigate('DrawerOpen');
  }

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
          onNavigationStateChange={state => this.props.updateWebView({
            pageTitle: state.title,
            currentUrl: state.url,
            webCanGoBack: state.canGoBack,
            webCanGoForward: state.canGoForward,
          })}
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
