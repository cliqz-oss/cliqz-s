import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
  urlBarBlur,
  updateUrlBar,
  urlBarQuery,
  goBack,
  goForward,
  openLink,
  changeScreen,
} from '../actions/index';
import DEFAULT_SEARCH_ENGINE_URL from '../constants/urls';
import { parseURL } from '../cliqz';
import Button from './Button';
import HomeButton from './HomeButton';

const styles = StyleSheet.create({
  visitModeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  urlbar: {
    backgroundColor: '#444',
    flexDirection: 'row',
    height: 50,
  },
  domain: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
  },
  domainText: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    paddingTop: 7,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 5,
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
  onSubmit = () => {
    const { query } = this.props;
    let url = query;

    if (!parseURL(query)) {
      const encodedQuery = encodeURIComponent(query);
      url = `${DEFAULT_SEARCH_ENGINE_URL}${encodedQuery}`;
    }

    this.props.openLink(url);
  };

  renderCancelButton() {
    return (
      <TouchableHighlight
        style={{ justifyContent: 'center' }}
        onPress={this.props.urlBarBlur}
      >
        <Text style={{ color: 'white', marginRight: 7 }}>Cancel</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      query,
      url,
      webView,
      pageTitle,
      goBack: goBackAction,
      goForward: goForwardAction,
      mode,
    } = this.props;
    const { canGoBack, canGoForward } = webView;

    return (
      <View style={styles.urlbar}>
        {mode === 'search' &&
          <View style={styles.visitModeContainer}>
            <TextInput
              ref={(el) => { this.input = el; }}
              testID='UrlBar'
              placeholder='Search!'
              underlineColorAndroid='white'
              selectTextOnFocus={true}
              autoCorrect={false}
              onChangeText={this.props.urlBarQuery}
              onSubmitEditing={this.onSubmit}
              style={styles.input}
              value={query}
            />
            {(!this.props.query && !this.props.url)
                ? <HomeButton />
                : this.renderCancelButton()
            }
          </View>
        }
        {mode === 'visit' &&
          <View style={styles.visitModeContainer}>
            <Button
              disabled={!canGoBack}
              title='&#9664;'
              onPress={goBackAction}
            />
            <Button
              disabled={!canGoForward}
              title='&#9654;'
              onPress={goForwardAction}
            />
            <TouchableHighlight
              style={styles.domain}
              onPress={() => this.props.updateUrlBar(this.props.url)}
            >
              <Text style={styles.domainText}>{pageTitle || url }</Text>
            </TouchableHighlight>
            <HomeButton />
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
  webView,
  mode,
}) => ({
  query,
  url,
  currentUrl,
  pageTitle,
  webView,
  mode,
});

export default connect(mapStateToProps, {
  updateUrlBar,
  urlBarBlur,
  urlBarQuery,
  goBack,
  goForward,
  openLink,
  changeScreen,
})(UrlBar);
