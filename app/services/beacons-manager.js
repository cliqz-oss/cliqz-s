import { Platform, DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import EventEmitter from 'events';
import { recordBeaconsInRange } from '../actions/index';

const region = {
  identifier: 'Estimotes',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
};

export default class BeaconsManager extends EventEmitter {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch;
  }

  beaconsDidRange = ({ beacons }) => {
    this.dispatch(recordBeaconsInRange(beacons));
  }

  init() {
    if (Platform.os === 'ios') {
      Beacons.requestAlwaysAuthorization();
      Beacons.startUpdatingLocation();
    } else {
      Beacons.detectIBeacons();
    }

    Beacons.startMonitoringForRegion(region);

    Beacons.startRangingBeaconsInRegion(region.identifier, region.uuid);

    DeviceEventEmitter.addListener('beaconsDidRange', this.beaconsDidRange);
  }

  unload() {
    DeviceEventEmitter.removeListener('beaconsDidRange', this.beaconsDidRange);
  }
}
