import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import CardList from './extension/build/components/CardList';
import ImageButton from './extension/build/ci-components/image-button';

import startup from './extension/build/modules/platform/startup';
import inject from './extension/build/modules/core/kord/inject';


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
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
    this.setState({ query, result: this.state.result });
    // console.log(this.state);
    if (!this.autocomplete) {
      return;
    }
    this.autocomplete.action('search', query, (result) => {
      // console.log('query check', this.autocomplete.lastSearch, query)
      if (this.state.query !== query) {
        return;
      }
      this.setState({ query, result });
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    const preNavigate = this.props.preNavigate || Promise.resolve();
    const navigation = this.props.navigation;
    const onChange = this.searchResults.bind(this);
    const image = require('./extension/build/images/Home.png')
    const { openUrl } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextInput autoFocus={true} placeholder='Search!'
            onChangeText={onChange}
            style={styles.cliqz} />
          <ImageButton
            style={styles.home}
            size={21}
            appearance={{normal: image, highlight: image}}
            onPress={() => preNavigate.then(data => {
              navigation.goBack()
            })}
          />
        </View>
        <View style={{ height: 400 }}>
          <CardList result={this.state.result} openLink={openUrl}/>
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