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
  visitModeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  urlbar: {
    backgroundColor: '#00AEF0',
    paddingTop: 2,
    flexDirection: 'row',
    height: 50,
  },
  domain: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    margin: 5,
    borderRadius: 7,
    fontSize: 15,
    color: 'black',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 0,
    textDecorationLine: 'none',
  },
});

export default class UrlBar extends Component {
  onDomainPressed = () => {
    this.props.onTouch();
  };

  render() {
    const {
      query,
      canGoBack,
      canGoForward,
      setState,
      url,
      pageTitle,
      goBack,
      goForward,
      mode,
    } = this.props;

    return (
      <View style={styles.urlbar}>
        {mode === 'search' &&
          <TextInput
            ref={(el) => { this.input = el; }}
            testID='UrlBar'
            placeholder='Search!'
            underlineColorAndroid='white'
            autoFocus={query.length > 0}
            selectTextOnFocus={true}
            onChangeText={q => setState({
              query: q,
              webCanGoBack: false,
              webCanGoForward: false,
            })}
            style={styles.input}
            value={query}
          />
        }
        {mode === 'visit' &&
          <View style={styles.visitModeContainer}>
            <TouchableHighlight style={styles.domain} onPress={this.onDomainPressed}>
              <Text style={styles.domain}>{pageTitle || url }</Text>
            </TouchableHighlight>
            <Button
              disabled={!canGoBack}
              title={'Back'}
              onPress={goBack}
              style={styles.button}
            />
            <Button
              disabled={!canGoForward}
              title={'Forward'}
              onPress={goForward}
              style={styles.button}
            />
          </View>
        }
      </View>
    );
  }
}
