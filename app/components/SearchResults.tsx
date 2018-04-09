import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  startup,
  CardList,
  events,
  inject,
} from '../cliqz';

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#E7ECEE',
    flex: 1,
    flexDirection: 'column',
  },
});

interface ISearchResultsProps {
  query: string;
  openLink: (url: string) => void;
}

interface ISearchResultsState {
  query: string;
  result: any;
}

export default class SearchResults extends React.Component<
  ISearchResultsProps,
  ISearchResultsState
> {
  autocomplete: any;
  openListener: any;

  constructor(props: ISearchResultsProps) {
    super(props);
    this.autocomplete = inject.module('autocomplete');
    this.state = {
      query: '',
      result: null,
    };
  }

  componentWillReceiveProps(props: ISearchResultsProps) {
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

  searchResults(query: string) {
    return this.autocomplete.action('search', query, (result: any) => {
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
