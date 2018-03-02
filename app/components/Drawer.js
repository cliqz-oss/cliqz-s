import React from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import getLogo from 'cliqz-logo-database';
import NativeDrawable, { normalizeUrl } from 'browser-core/build/modules/platform/components/NativeDrawable';

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

export default function (props) {
  return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <FlatList testID='Drawer' style={styles.list}
            data={data}
            renderItem={({ item }) => (
              <ListItem
                title={item.domain}
                subtitle={item.lastVisisted}
                avatar={
                  <NativeDrawable
                    source={normalizeUrl(getLogo(item.baseUrl).logoUrl)}
                    style={{ width: 40, height: 40, backgroundColor: 'black' }}
                  />
                }
              />
            )}
            inverted
          />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
