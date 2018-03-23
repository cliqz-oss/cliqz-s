import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
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
} from '../actions/index';
import DEFAULT_SEARCH_ENGINE_URL from '../constants/urls';
import { parseURL } from '../cliqz';

const styles = StyleSheet.create({
  visitModeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  urlbar: {
    backgroundColor: '#444',
    flexDirection: 'row',
    height: 50,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
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
  buttonContainer: {
    flex: 0,
    backgroundColor: '#444',
    padding: 10,
    marginRight: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
});

const Button = props => (
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={props.onPress}
  >
    <Text style={[styles.buttonText, props.disabled ? ({ color: '#888' }) : null]}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

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
    if (!this.props.query && !this.props.url) {
      return null;
    }
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
              autoFocus={true}
              selectTextOnFocus={true}
              onChangeText={this.props.urlBarQuery}
              onSubmitEditing={this.onSubmit}
              style={styles.input}
              value={query}
            />
            {this.renderCancelButton()}
          </View>
        }
        {mode === 'visit' &&
          <View style={styles.visitModeContainer}>
            <TouchableHighlight
              style={styles.domain}
              onPress={() => this.props.updateUrlBar(this.props.url)}
            >
              <Text style={styles.domainText}>{pageTitle || url }</Text>
            </TouchableHighlight>
            <Button
              disabled={!canGoBack}
              title={'<'}
              onPress={goBackAction}
            />
            <Button
              disabled={!canGoForward}
              title={'>'}
              onPress={goForwardAction}
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

const mapDispatchToProps = dispatch => ({
  updateUrlBar: (...args) => dispatch(updateUrlBar(...args)),
  urlBarBlur: url => dispatch(urlBarBlur(url)),
  urlBarQuery: (...args) => dispatch(urlBarQuery(...args)),
  goBack: () => dispatch(goBack()),
  goForward: () => dispatch(goForward()),
  openLink: url => dispatch(openLink(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlBar);
