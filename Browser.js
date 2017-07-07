import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

import ConversationUI from './extension/build/ci-components/conversation-ui';
import Search from './Search';

export default function() {
  const screens = {
    Search: { screen: Search }
  }
  const queryCliqz = (navigation, query="") => {
    // console.log('xxx', navigation);
    navigation.navigate('Search', query);
  }
  return <ConversationUI extraScreens={screens} queryCliqz={queryCliqz}/>
}
