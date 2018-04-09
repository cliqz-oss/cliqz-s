declare module 'react-moment' {
  import reactMoment from 'react-moment';
  import * as React from 'react';
  import { ViewStyle, Text, ViewProperties } from 'react-native';

  interface IMomentProps extends ViewProperties {
    fromNow: boolean;
    element: Text;
  }

  export default class Moment extends React.Component<IMomentProps> {

  }
}
