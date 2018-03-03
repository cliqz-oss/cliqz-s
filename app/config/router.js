import { DrawerNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Drawer from '../components/Drawer';

export default DrawerNavigator({
  Home: {
    screen: Home,
  },
}, {
  contentComponent: Drawer,
});
