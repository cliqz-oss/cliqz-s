import { Navigation } from 'react-native-navigation';

import Home from './app/screens/Home';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('cliqzs.Home', () => Home, store, Provider);
}