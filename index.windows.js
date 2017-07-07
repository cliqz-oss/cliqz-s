/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  TextInput
} from 'react-native';
import CardList from './extension/build/components/CardList';

import startup from './extension/build/modules/platform/startup';
import inject from './extension/build/modules/core/kord/inject';


class CliqzTab extends Component {
  render() {
    return (
      <WebView
        source={{uri: "https://cliqz.com"}}
        style={{ flex:1 }}
      />
    );
  }
}

class NewsTab extends Component {
  render() {
    return (
      <WebView
        source={{uri: "https://theguardian.com/uk"}}
        style={{ flex:1 }}
      />
    );
  }
}

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: 'test',
      result: null,
    }
  }

  componentDidMount() {
    startup.then(() => {
      this.autocomplete = inject.module('autocomplete');
      this.searchResults(this.state.query);
    });
  }

  searchResults(query) {
    console.log('xxx', query);
    this.setState({ query, result: this.state.result });
    console.log(this.state);
    if (!this.autocomplete) {
      return;
    }
    this.autocomplete.action('search', query, (result) => {
      // console.log('query check', this.autocomplete.lastSearch, query)
      if (this.state.query !== query) {
        return;
      }
      // console.log('result', result);
      this.setState({ query, result });
    }).then(console.log.bind(console)).catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput autoFocus={true} placeholder='Search!'
          onChangeText={(query) => this.searchResults(query)}/>
        <View style={styles.search}>
          <CardList result={this.state.result} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  search: {
    flex: 1,
    flexDirection: 'column',
  }
});

AppRegistry.registerComponent('CliqzS', () => Search);