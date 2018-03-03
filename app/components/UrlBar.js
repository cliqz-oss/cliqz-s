import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  cliqz: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#909090',
    fontSize: 15,
    paddingTop: 14,
    paddingLeft: 20,
    paddingBottom: 11,
  },
  urlBar: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#909090',
    fontSize: 15,
    paddingTop: 14,
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
    borderStyle: 'solid',
  },
});

class NavButtons extends Component {
  render() {
    const {
      canGoBack,
      onBack,
      canGoForward,
      onForward,
    } = this.props;

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
    );
  }
}

class QueryBar extends Component {
  render() {
    return (
      <View style={styles.topContainer}>
        <TextInput
          testID='UrlBar'
          autoFocus={false}
          placeholder='Search!'
          onChangeText={this.props.onChange}
          style={styles.cliqz}
          value={this.props.query}
        />
      </View>
    );
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
    );
  }
}

export default function URLBAR(props) {
  const {
    query,
    canGoBack,
    canGoForward,
    setState,
    onTouch,
    url,
    pageTitle,
    goBack,
    goForward,
  } = props;

  return (
    <View>
      <QueryBar
        onChange={q => setState({
          query: q,
          webCanGoBack: false,
          webCanGoForward: false,
        })}
        query={query}
      />
      <UrlBar
        url={url}
        title={pageTitle}
        onTouch={onTouch}
      />
      <NavButtons
        canGoBack={!!canGoBack}
        canGoForward={!!canGoForward}
        onBack={goBack}
        onForward={goForward}
      />
    </View>
  );
}
