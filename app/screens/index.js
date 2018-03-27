import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Drawer from './Drawer';

export default function registerScreens(store, Provider) {
  Navigation.registerComponent('cliqzs.Home', () => Home, store, Provider);
  Navigation.registerComponent('cliqzs.Drawer', () => Drawer, store, Provider);
}
