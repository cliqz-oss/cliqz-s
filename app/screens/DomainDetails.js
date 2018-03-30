import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Logo } from '../cliqz';
import {
  changeScreen,
  openLink,
} from '../actions/index';
import {
  DOMAIN_LIST_SCREEN,
  HOME_SCREEN,
} from '../constants/screen-names';
import Button from '../components/Button';
import HomeButton from '../components/HomeButton';

const prepareMessages = (visits) => {
  const user = {
    _id: -1,
  };

  return visits
    .filter(visit => !!visit.title)
    .map(visit => ({
      _id: visit.visitedAt,
      text: `${visit.title}\n${visit.url}`,
      url: visit.url,
      createdAt: new Date(visit.visitedAt / 1000),
      user,
    }));
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

class DomainDetails extends PureComponent {
  onBackButtonPress = () => {
    this.props.changeScreen(DOMAIN_LIST_SCREEN);
  };

  handleUrlPress = (url) => {
    this.props.changeScreen(HOME_SCREEN);
    this.props.openLink(url);
  };

  render() {
    if (this.props.messages.length === 0) {
      return null;
    }
    const mainUrl = this.props.messages[0].url;
    const messages = prepareMessages(this.props.messages);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <GiftedChat
            messages={messages}
            renderComposer={() => {}}
            renderAvatar={() => <Logo url={mainUrl} />}
            renderAvatarOnTop={true}
            parsePatterns={() => [
              { type: 'url', style: { color: 'rgb(26, 13, 171)', textDecorationLine: 'underline' }, onPress: this.handleUrlPress },
            ]}
          />
        </View>

        <View style={{
          height: 50,
          flexDirection: 'row',
        }}>
          <Button
            title="&#9664;"
            onPress={this.onBackButtonPress}
          />
          <View style={{ flex: 1 }} />
          <HomeButton />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps, {
  changeScreen,
  openLink,
})(DomainDetails);
