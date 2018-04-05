import * as React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from '../actions/index';
import {
  DOMAIN_LIST_SCREEN,
  HOME_SCREEN,
} from '../constants/screens';
import Button from './Button';

interface IHomeButtonProps {
  screen: string;
  changeScreen: (screenName: string) => {};
  children?: React.ReactNode;
}

function HomeButton(props: IHomeButtonProps) {
  const screen = props.screen === HOME_SCREEN ? DOMAIN_LIST_SCREEN : HOME_SCREEN;
  return (
    <Button
      disabled={false}
      title="&#9632;"
      onPress={() => props.changeScreen(screen)}
    />
  );
}

export default connect(
  (state: any) => ({ screen: state.screen }),
  { changeScreen },
)(HomeButton);
