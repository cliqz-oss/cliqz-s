import { Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import EventEmitter from 'events';
import { DeviceEventEmitter } from 'react-native'

const region = {
  identifier: 'Estimotes',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
};

export default class BeaconsManager extends EventEmitter {
  init() {
    if (Platform.os === 'ios') {
      Beacons.requestAlwaysAuthorization();
      Beacons.startUpdatingLocation();
    } else {
      Beacons.detectIBeacons();
    }

    Beacons.startMonitoringForRegion(region);

    Beacons.startRangingBeaconsInRegion(region.identifier, region.uuid)
      .then(() => console.log('Beacons monitoring started succesfully'))
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      ({ beacons }) => console.warn('range', beacons)
    );

    DeviceEventEmitter.addListener(
      'regionDidEnter',
      ({ identifier, uuid, minor, major }) => {
        console.warn('monitoring - regionDidEnter data: ', { identifier, uuid, minor, major });
      }
    );

    /*
    this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener(
      'regionDidExit',
      ({
        identifier,
        uuid,
        minor,
        major,
      }) => {
        this.emit('regionDidExit', {
          identifier,
          uuid,
          minor,
          major,
        });
      },
    );
    */
  }

  unload() {
    /*
    this.regionDidEnterEvent.remove();
    this.regionDidExitEvent.remove();
    */
  }
}
