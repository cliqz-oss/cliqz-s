import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { urlBarBlur, updateUrlBar, urlBarQuery } from '../actions/index';

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

class UrlBar extends Component {
  render() {
    const {
      query,
      url,
      webCanGoBack,
      webCanGoForward,
      pageTitle,
      goBack,
      goForward,
      mode,
    } = this.props;

    const canGoBack = webCanGoBack || this.props.history.index > 0;
    const canGoForward = webCanGoForward ||
      this.props.history.index < this.props.history.stack.length;

    return (
      <View style={styles.urlbar}>
        {mode === 'search' &&
          <TextInput
            ref={(el) => { this.input = el; }}
            testID='UrlBar'
            placeholder='Search!'
            underlineColorAndroid='white'
            autoFocus={query && query.length > 0}
            selectTextOnFocus={true}
            onChangeText={this.props.urlBarQuery}
            style={styles.input}
            value={query}
          />
        }
        {mode === 'visit' &&
          <View style={styles.visitModeContainer}>
            <TouchableHighlight
              style={styles.domain}
              onPress={() => this.props.updateUrlBar(this.props.url)}
            >
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

const mapStateToProps = ({
  query,
  url,
  currentUrl,
  pageTitle,
  webCanGoBack,
  webCanGoForward,
  mode,
  history,
}) => ({
  query,
  url,
  currentUrl,
  pageTitle,
  webCanGoBack,
  webCanGoForward,
  mode,
  history,
});

const mapDispatchToProps = dispatch => ({
  updateUrlBar: (...args) => dispatch(updateUrlBar(...args)),
  urlBarBlur: url => dispatch(urlBarBlur(url)),
  urlBarQuery: (...args) => dispatch(urlBarQuery(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlBar);
