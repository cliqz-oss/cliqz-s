import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import Image from 'react-native-scalable-image';
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
  image: {
    marginTop: 20,
  },
});

const MAJOR_IMAGE_MAP: Map<number, string> = new Map();
MAJOR_IMAGE_MAP.set(18170, require('../../assets/coffee-dark.png'));
MAJOR_IMAGE_MAP.set(54505, require('../../assets/sheraton-dark.png'));

interface IBeaconListProps {
  changeScreen: (screen: string) => any;
  beacons: Beacon[];
}

class BeaconList extends React.Component<IBeaconListProps> {
  renderItem({ item }: { item: Beacon }) {
    return (
      <Image
        width={Dimensions.get('window').width}
        style={styles.image}
        source={MAJOR_IMAGE_MAP.get(item.major)}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={this.props.beacons}
          inverted
          renderItem={this.renderItem}
          keyExtractor={item => item.major.toString()}
          testID="Drawer"
        />
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
    beacons: state.beacons.filter(
      beacon => MAJOR_IMAGE_MAP.has(beacon.major),
    ),
  };
};

export default connect(mapStateToProps, {
  changeScreen,
})(BeaconList);
