import { Navigation } from 'react-native-navigation';
import {
  HOME_SCREEN,
  DOMAIN_LIST_SCREEN,
  DOMAIN_DETAILS_SCREEN,
} from '../constants/screen-names';
import Home from './Home';
import DomainList from './DomainList';
import DomainDetails from './DomainDetails';


export default function registerScreens(store, Provider) {
  Navigation.registerComponent(HOME_SCREEN, () => Home, store, Provider);
  Navigation.registerComponent(DOMAIN_LIST_SCREEN, () => DomainList, store, Provider);
  Navigation.registerComponent(DOMAIN_DETAILS_SCREEN, () => DomainDetails, store, Provider);
}
