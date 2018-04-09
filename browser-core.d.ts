
declare module 'browser-core' {
  export const startup: Promise<any>;
}

declare module 'browser-core/build/modules/mobile-cards/components/CardList' {
  import * as React from 'react';
  interface ICardListProps {
    result: any;
    openLink: (url: string) => void;
  }
  export default class extends React.Component<ICardListProps> {
  }
}

declare module 'browser-core/build/modules/mobile-cards/components/partials/Icon' {
  import * as React from 'react';
  interface IIconProps {
    url: string;
  }
  export default class extends React.Component<IIconProps> { }
}

declare module 'browser-core/build/modules/core/events' {
  type subscription = {
    unsubscribe: () => void;
  };
  type Events = {
    subscribe: (name: string, cb: (param: any) => void) => subscription;
  };
  const events: Events;
  export default events;
}

declare module 'browser-core/build/modules/core/kord/inject' {
  type Inject = {
    module: (name: string) => {};
  };
  const inject: Inject;
  export default inject;
}

type ParsedUrl = {
  hostname: string;
};

declare module 'browser-core/build/modules/core/url-info' {
  export const parseURL: (url: string) => ParsedUrl;
}
