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
import {
  FONT_COLOR_STYLE,
  BACKGROUND_COLOR_STYLE,
  BOTTOM_BAR_HEIGHT_STYLE,
} from '../constants/styles';
import { parseURL } from '../cliqz';
import Button from './Button';
import HomeButton from './HomeButton';

const styles = StyleSheet.create({
  visitModeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  urlbar: {
    borderTopColor: '#222',
    borderTopWidth: 0.5,
    backgroundColor: BACKGROUND_COLOR_STYLE,
    flexDirection: 'row',
    height: BOTTOM_BAR_HEIGHT_STYLE,
  },
  domain: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
  },
  domainText: {
    flex: 1,
    color: FONT_COLOR_STYLE,
    textAlign: 'center',
    fontSize: 17,
    paddingTop: 7,
    paddingLeft: 5,
    paddingRight: 65,
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
        <Text style={{ color: FONT_COLOR_STYLE, marginRight: 7 }}>Cancel</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      query,
      url,
      goBack: goBackAction,
      goForward: goForwardAction,
      mode,
      canGoBack,
      canGoForward,
    } = this.props;

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
              autoFocus={true}
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
              <Text style={styles.domainText}>{parseURL(url).hostname}</Text>
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
  mode,
  tabs,
}) => {
  const selectedTab = tabs.find(tab => tab.selected);

  if (!selectedTab) {
    return {
      query,
      mode,
    };
  }

  return {
    query,
    mode,
    url: selectedTab.currentUrl,
    canGoBack: selectedTab.canGoBack,
    canGoForward: selectedTab.canGoForward,
  };
};

export default connect(mapStateToProps, {
  updateUrlBar,
  urlBarBlur,
  urlBarQuery,
  goBack,
  goForward,
  openLink,
  changeScreen,
})(UrlBar);
