import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {
  FONT_COLOR_STYLE,
  BACKGROUND_COLOR_STYLE,
  BOTTOM_BAR_HEIGHT_STYLE,
} from '../constants/styles';
import { DOMAIN_LIST_SCREEN } from '../constants/screens';
import { changeScreen } from '../actions/index';
import { Beacon } from '../models/beacon';
import Button from '../components/Button';
import HomeButton from '../components/HomeButton';
import { connect } from 'react-redux';
import { AppState } from '../app-state';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  image: {
    flex: 1,
    maxHeight: 120,
    margin: 20,
  },
});

const MINOR_IMAGE_MAP = {
  1: require('../../assets/cliqz.png'),
};

interface IBeaconListProps {
  changeScreen: (screen: string) => any;
  beacons: Beacon[];
}

class BeaconList extends React.Component<IBeaconListProps> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.list}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={MINOR_IMAGE_MAP[1]}
          />
        </View>
        <View style={{
          height: BOTTOM_BAR_HEIGHT_STYLE,
          flexDirection: 'row',
        }}>
          <Button
            title="&#9664;"
            onPress={() => this.props.changeScreen(DOMAIN_LIST_SCREEN)}
            disabled={false}
          />
          <View style={{ flex: 1 }}>
          </View>
          <HomeButton />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    beacons: state.beacons,
  };
};

export default connect(mapStateToProps, {
  changeScreen,
})(BeaconList);
