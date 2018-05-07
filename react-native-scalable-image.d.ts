declare module 'react-native-scalable-image' {
  import * as React from 'react';

  interface IImageProps {
    width: number;
    style: any;
    source: any;
  }
  export default class extends React.Component<IImageProps> {
  }
}
