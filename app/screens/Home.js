import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  WebView
} from 'react-native';
import { startup, components } from 'browser-core';
import CardList from 'browser-core/build/modules/mobile-cards/components/CardList';
import inject from 'browser-core/build/modules/core/kord/inject';
import events from 'browser-core/build/modules/core/events';

class QueryBar extends Component {

  render() {
    return (<View style={styles.topContainer}>
      <TextInput
        testID='UrlBar'
        autoFocus={true}
        placeholder='Search!'
        onChangeText={this.props.onChange}
        style={styles.cliqz}
        value={this.props.query}
      />
    </View>)
  }
}

class UrlBar extends Component {

  render() {
    const { url, title, onTouch } = this.props;
    return (
    <TouchableHighlight onPress={onTouch}>
      <View style={styles.topContainer}>
          <Text style={styles.urlBar}>{title || url }</Text>
      </View>
    </TouchableHighlight>
    )
  }
}

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.autocomplete = inject.module('autocomplete');
    this.state = {
      query: '',
      result: null,
    }
  }

  componentWillReceiveProps(props) {
    this.searchResults(props.query);
  }

  componentWillMount() {
    startup.then(() => {
      this.searchResults(this.props.query);
      this.openListener = events.subscribe('mobile-search:openUrl', (url) => {
        this.props.openLink(url);
      })
    });
  }

  componentWillUnmount() {
    this.openListener.unsubscribe();
  }

  searchResults(query) {
    // console.log(this.state);
    if (!this.autocomplete) {
      return Promise.reject();
    }
    return this.autocomplete.action('search', query, (result) => {
      // console.log('query check', this.autocomplete.lastSearch, query)
      if (this.props.query !== query) {
        // there is already a new query ready
        return;
      }
      this.setState({ query, result });
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <View style={styles.search}>
        <CardList result={this.state.result} openLink={this.props.openLink}/>
      </View>
    )
  }
}

class NavButtons extends Component {

  render() {
    const { canGoBack, onBack, canGoForward, onForward } = this.props;
    return (
    <View style={styles.topContainer}>
      <Button
        disabled={!canGoBack}
        title={'Back'}
        onPress={onBack}
      />
      <Button
        disabled={!canGoForward}
        title={'Forward'}
        onPress={onForward}
      />
    </View>
    )
  }
}

const WEBVIEW_REF = 'webview';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'search',
      query: '',
    }
    this.history = {
      stack: [],
      index: 0
    };
  }

  pushHistory() {
    if (this.history.index < this.history.stack.length) {
      this.history.stack = this.history.stack.slice(0, this.history.index);
    }
    this.history.index = this.history.stack.push(this.state);
  }

  goBack() {
    if (this.state.webCanGoBack && this.refs[WEBVIEW_REF]) {
      this.refs[WEBVIEW_REF].goBack()
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
    if (this.state.webCanGoForward && this.refs[WEBVIEW_REF]) {
      this.refs[WEBVIEW_REF].goForward()
    } else {
      this.history.index += 1;
      this.setState(this.history.stack[this.history.index]);
    }
  }

  render() {
    const { mode, query, url, pageTitle, webCanGoBack, webCanGoForward } = this.state;
    const canGoBack = webCanGoBack || this.history.index > 0;
    const canGoForward = webCanGoForward || this.history.index < this.history.stack.length;
    if (mode === 'search') {
      return (
        <View style={styles.container}>
          <QueryBar onChange={(q) => this.setState({ query: q, webCanGoBack: false, webCanGoForward: false })} query={query}/>
          <SearchResults
            query={this.state.query}
            openLink={(url) => {
              this.pushHistory()
              this.setState({ mode: 'visit', url })
            }}
          />
          <NavButtons
            canGoBack={!!canGoBack}
            canGoForward={!!canGoForward}
            onBack={() => this.goBack()}
            onForward={() => this.goForward()}
          />
        </View>)
    } else if (mode === 'visit') {
      return (
        <View style={styles.container}>
          <UrlBar
            url={url}
            title={pageTitle}
            onTouch={() => this.setState({ mode: 'search', query: this.state.url })}
          />
          <WebView
            ref={WEBVIEW_REF}
            source={{uri: this.state.url}}
            onNavigationStateChange={(state) => this.setState({ pageTitle: state.title, url: state.url, webCanGoBack: state.canGoBack, webCanGoForward: state.canGoForward })}
          />
          <NavButtons
            canGoBack={!!canGoBack}
            canGoForward={!!canGoForward}
            onBack={() => this.goBack()}
            onForward={() => this.goForward()}
          />
        </View>)
    }
    return <View style={styles.container}></View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  search: {
    backgroundColor: '#E7ECEE',
    flex: 1,
    flexDirection: 'column',
  },
  cliqz: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#909090',
    fontSize: 15,
    paddingTop: 14,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingBottom: 11
  },
  urlBar: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#909090',
    fontSize: 15,
    paddingTop: 14,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingBottom: 11,
    borderStyle: 'solid',
    backgroundColor: '#222',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    borderStyle: 'solid'
  },
  home: {
    marginTop: 0,
    marginRight: 0,
    width: 40,
    height: 40
  }
});
