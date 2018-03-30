import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../actions/index';
import { DOMAIN_LIST_SCREEN } from '../constants/screen-names';
import Button from './Button';

const HomeButton = (props) => {
  return (
    <Button
      title='&#9632;'
      onPress={() => props.changeScreen(DOMAIN_LIST_SCREEN)}
    />
  );
};

export default connect(state => ({ screen: state.screen }), { changeScreen })(HomeButton);
