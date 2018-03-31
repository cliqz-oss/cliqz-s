import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  BACKGROUND_COLOR_STYLE,
  FONT_COLOR_STYLE,
} from '../constants/stylesheets';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    backgroundColor: BACKGROUND_COLOR_STYLE,
    padding: 10,
    marginRight: 7,
  },
  buttonText: {
    color: FONT_COLOR_STYLE,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default function Button(props) {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={props.onPress}
    >
      <Text style={[styles.buttonText, props.disabled ? ({ color: '#888' }) : null]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
