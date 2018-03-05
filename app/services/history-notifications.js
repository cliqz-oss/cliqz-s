import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import EventEmitter from 'events';

export default class extends EventEmitter {
  constructor() {
    super();
    this.notificationsModule = NativeModules.NotificationModule ? new NativeEventEmitter(NativeModules.NotificationModule) : {
      registerForEvent() {},
      addListener() {},
    };
  }

  init() {
    this.notificationsModule.addListener('NotificationEvent', (...args) => this.emit('history', ...args));
    this.notificationsModule.registerForEvent('WebHistoryItemsAddedNotification');
  }
}
