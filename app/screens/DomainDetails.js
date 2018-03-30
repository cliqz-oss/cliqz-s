import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { changeScreen } from '../actions/index';
import { DOMAIN_LIST_SCREEN } from '../constants/screen-names';
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

  onPress = () => {
    this.props.changeScreen(DOMAIN_LIST_SCREEN);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Text>TODO</Text>
        </View>

        <View style={{
          height: 50,
          flexDirection: 'row',
        }}>
          <Button
            title="&#9664;"
            onPress={this.onPress}
          />
          <View style={{ flex: 1 }} />
          <HomeButton />
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { changeScreen })(DomainDetails);
