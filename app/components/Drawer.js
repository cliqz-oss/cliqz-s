import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import Icon from 'browser-core/build/modules/mobile-cards/components/partials/Icon';

const data = [
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
  {
    domain: 'cliqz.com',
    baseUrl: 'https://cliqz.com',
    lastVisisted: '2 hours ago',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default function Drawer() {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <FlatList testID='Drawer' style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <ListItem
            title={item.domain}
            subtitle={item.lastVisisted}
            avatar={
              <Icon url='https://cliqz.com' />
            }
          />
        )}
        inverted
      />
    </SafeAreaView>
  );
}
