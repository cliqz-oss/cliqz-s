import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  WebView,
  Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import events from './extension/build/modules/core/events';
import ConversationUI from './extension/build/ci-components/conversation-ui';
import Search from './Search';
import TopBar from './extension/build/ci-components/top-bar';

const queryCliqz = (navigation, query="") => {
  navigation.navigate('Search', query);
}

const openUrl = (navigation, url) => {
  navigation.navigate('Tab', {url});
}

class SearchScreen extends Component {

  render() {
    const navigation = this.props.navigation;
    const openSearchResult = openUrl.bind(null, navigation);
    return <View style={{flex: 1, backgroundColor:'#FFFFFF'}}>
      <TopBar
        queryCliqz={navigation.dispatch.bind(NavigationActions.back())}
        navigation={navigation}
        navigateTo='Home'
      />
      <Search navigation={navigation} openUrl={openSearchResult}/>
    </View>
  }
}

class Tab extends Component {

  render() {
    const navigation = this.props.navigation;
    const { url } = navigation.state.params;
    return <View style={{flex: 1, backgroundColor:'#FFFFFF'}}>
      <TopBar
        queryCliqz={queryCliqz}
        navigation={navigation}
        navigateTo='Home'
      />
      <Text>{url}</Text>
      <WebView source={{uri: url}}
        onNavigationStateChange={this.onNavigationStateChange}/>
    </View>
  }

  onNavigationStateChange(state) {
    const { loading, title, url, canGoBack, canGoForward, navigationType } = state;
    if (!loading && navigationType !== 'other') {
      events.pub('history:add', { title, url, lastVisitDate: Date.now() * 1000 })
    }
  }
}

export default function() {
  const screens = {
    Search: { screen: SearchScreen },
    Tab: { screen: Tab }
  }
  return <ConversationUI extraScreens={screens} queryCliqz={queryCliqz} openUrl={openUrl}/>
}
