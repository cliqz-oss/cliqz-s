import * as React from 'react';
import reactMoment from 'react-moment';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { connect } from 'react-redux';
import {
  Logo,
  parseURL,
} from '../cliqz';
import {
  fetchDomains,
  openDomain,
} from '../actions/index';
import { DOMAIN_LIST_SCREEN } from '../constants/screens';
import HomeButton from '../components/HomeButton';
import {
  FONT_COLOR_STYLE,
  BACKGROUND_COLOR_STYLE,
  BOTTOM_BAR_HEIGHT_STYLE,
} from '../constants/styles';
import { History } from '../models/history';
import { Tab } from '../models/tab';
import { AppState } from '../app-state';

// tslint:disable-next-line
const Moment = reactMoment;

const itemWithTabsBackgroundColor = '#31325b';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_STYLE,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    padding: 10,
    flexDirection: 'row',
  },
  rowText: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
});

interface IDrawerItemProps {
  domain: string;
  isActive: boolean;
  baseUrl: string;
  lastVisisted: number;
  onPressItem: (domain: string) => void;
}

class DrawerItem extends React.PureComponent<IDrawerItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.domain);
  }

  render() {
    const additionalStyle = {
      backgroundColor: this.props.isActive ? itemWithTabsBackgroundColor : undefined,
    };
    const textStyle: TextStyle = { color: FONT_COLOR_STYLE };
    return (
      <TouchableOpacity
        style={[styles.row, additionalStyle]}
        onPress={this.onPress}
      >
        <Logo
          url={this.props.baseUrl}
        />
        <View style={styles.rowText}>
          <Text style={{ color: FONT_COLOR_STYLE }}>{this.props.domain}</Text>
          <Moment
            style={textStyle}
            element={Text}
            fromNow
          >
            {this.props.lastVisisted / 1000}
          </Moment>
        </View>
      </TouchableOpacity>
    );
  }
}

interface Domain extends History {
  isActive: boolean;
}

interface IDrawerProps {
  fetchDomains: () => any;
  openDomain: (domain: string) => any;
  domains: Domain[];
}

class Drawer extends React.PureComponent<IDrawerProps> {
  listener: ScreenVisibilityListener;

  constructor(props: IDrawerProps) {
    super(props);
    this.listener = new ScreenVisibilityListener({
      willAppear: ({ screen }) => {
        if (screen === DOMAIN_LIST_SCREEN) {
          this.props.fetchDomains();
        }
      },
    });
  }

  onPressItem = (domain: string) => {
    this.props.openDomain(domain);
  }

  renderItem = ({ item }: { item: Domain }) => (
    <DrawerItem
      lastVisisted={item.lastVisisted}
      domain={item.domain}
      baseUrl={item.baseUrl}
      onPressItem={this.onPressItem}
      isActive={item.isActive}
    />
  )

  componentDidMount() {
    this.listener.register();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.domains}
          inverted
          renderItem={this.renderItem}
          keyExtractor={item => item.lastVisisted.toString()}
          style={styles.list}
          testID="Drawer"
        />
        <View style={{
          height: BOTTOM_BAR_HEIGHT_STYLE,
          flexDirection: 'row',
        }}>
          <View style={{ flex: 1 }} />
          <HomeButton />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const openedDomains = state.tabs.map(tab => parseURL(tab.currentUrl).hostname);
  return {
    domains: state.domains.map(domain => ({
      ...domain,
      isActive: openedDomains.includes(domain.domain),
    })),
  };
};

export default connect(mapStateToProps, {
  fetchDomains,
  openDomain,
})(Drawer);
