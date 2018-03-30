import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../actions/index';
import {
  DOMAIN_LIST_SCREEN,
  HOME_SCREEN,
} from '../constants/screen-names';
import Button from './Button';

const HomeButton = (props) => {
  const screen = props.screen === HOME_SCREEN ? DOMAIN_LIST_SCREEN : HOME_SCREEN;
  return (
    <Button
      title='&#9632;'
      onPress={() => props.changeScreen(screen)}
    />
  );
};

export default connect(state => ({ screen: state.screen }), { changeScreen })(HomeButton);
