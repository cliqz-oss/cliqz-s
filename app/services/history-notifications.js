import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import EventEmitter from 'events';

export default class extends EventEmitter {
  constructor() {
    super();

    // on iOS
    if (NativeModules.NotificationModule) {
      this.notificationsModule = new NativeEventEmitter(NativeModules.NotificationModule);
      NativeModules.NotificationModule.registerForEvent('WebHistoryItemsAddedNotification');
    } else {
      this.notificationsModule = {
        registerForEvent() {},
        addListener() {},
      };
    }
  }

  init() {
    this.notificationsModule.addListener('NotificationEvent', (...args) => this.emit('history', ...args));
  }
}
