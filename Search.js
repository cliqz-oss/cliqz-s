import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import CardList from './extension/build/components/CardList';

import startup from './extension/build/modules/platform/startup';
import inject from './extension/build/modules/core/kord/inject';


export default class extends Component {

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
      this.setState({ query, result });
    }).then(console.log.bind(console)).catch((err) => {
      console.error(err);
    });
  }

  render() {
    const onChange = this.searchResults.bind(this);
    return (
      <View style={styles.container}>
        <TextInput autoFocus={true} placeholder='Search!'
          onChangeText={onChange} style={{ height: 50 }}/>
        <View style={{ height: 400 }}>
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