import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import inject from 'browser-core/build/modules/core/kord/inject';
import { startup } from 'browser-core';
import CardList from 'browser-core/build/modules/mobile-cards/components/CardList';
import events from 'browser-core/build/modules/core/events';

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#E7ECEE',
    flex: 1,
    flexDirection: 'column',
  },
});

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = inject.module('autocomplete');
    this.state = {
      query: '',
      result: null,
    };
  }

  componentWillReceiveProps(props) {
    this.searchResults(props.query);
  }

  componentWillMount() {
    startup.then(() => {
      this.searchResults(this.props.query);
      this.openListener = events.subscribe('mobile-search:openUrl', (url) => {
        this.props.openLink(url);
      });
    });
  }

  componentWillUnmount() {
    this.openListener.unsubscribe();
  }

  searchResults(query) {
    if (!this.autocomplete) {
      return Promise.reject();
    }
    return this.autocomplete.action('search', query, (result) => {
      if (this.props.query !== query) {
        // there is already a new query ready
        return;
      }
      this.setState({ query, result });
    }).catch();
  }

  render() {
    return (
      <View style={styles.search}>
        <CardList result={this.state.result} openLink={this.props.openLink}/>
      </View>
    );
  }
}
