import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import { DOMAIN_LIST_SCREEN } from '../constants/screen-names';

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
    this.props.navigator.resetTo({
      screen: DOMAIN_LIST_SCREEN,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Text>TODO</Text>
        </View>

        <View>
          <Button
            title="Back"
            onPress={this.onPress}
          />
          <Button
            title="HOME"
            onPress={this.onPress}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(DomainDetails);
