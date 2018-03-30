import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Logo } from '../cliqz';
import { GiftedChat } from 'react-native-gifted-chat'
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
  static navigatorStyle = {
    navBarHidden: true,
  };

  onBackButtonPress = () => {
    this.props.changeScreen(DOMAIN_LIST_SCREEN);
  };

  handleUrlPress = (url) => {
    this.props.changeScreen(HOME_SCREEN);
    this.props.openLink(url);
  };

  render() {
    const mainUrl = this.props.messages[0].url;
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <GiftedChat
            messages={this.props.messages}
            renderComposer={() => {}}
            renderAvatar={message => <Logo url={mainUrl} />}
            renderAvatarOnTop={true}
            parsePatterns={(linkStyle) => [
              {type: 'url', style: { color: 'rgb(26, 13, 171)', textDecorationLine: 'underline' }, onPress: this.handleUrlPress},
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
      </View>
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
