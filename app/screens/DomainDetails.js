import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
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
import {
  BACKGROUND_COLOR_STYLE,
  BOTTOM_BAR_HEIGHT_STYLE,
} from '../constants/stylesheets';
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
    backgroundColor: BACKGROUND_COLOR_STYLE,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  url: {
    color: 'rgb(26, 13, 171)',
    textDecorationLine: 'underline',
  },
  spacer: {
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
            renderInputToolbar={() => null}
            renderComposer={() => null}
            renderLoading={() => <ActivityIndicator size="large" color="#ffffff" style={{ flex: 1 }} />}
            minInputToolbarHeight={0}
            renderAvatar={() => <Logo url={mainUrl} />}
            renderAvatarOnTop={true}
            parsePatterns={() => [
              { type: 'url', style: styles.url, onPress: this.handleUrlPress },
            ]}
          />
        </View>

        <View style={{
          height: BOTTOM_BAR_HEIGHT_STYLE,
          flexDirection: 'row',
        }}>
          <Button
            title="&#9664;"
            onPress={this.onBackButtonPress}
          />
          <View style={styles.spacer} />
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
