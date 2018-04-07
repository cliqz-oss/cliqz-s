declare module 'browser-core' {
  export const startup: () => Promise<any>;
}

declare module 'browser-core/build/modules/mobile-cards/components/CardList' {
  export default class {}
}

declare module 'browser-core/build/modules/mobile-cards/components/partials/Icon' {
  export default class {}
}

declare module 'browser-core/build/modules/core/events' {
  type events = {};
  export default events;
}

declare module 'browser-core/build/modules/core/kord/inject' {
  type inject = () => {};
  export default inject;
}

type ParsedUrl = {
  hostname: string;
};

declare module 'browser-core/build/modules/core/url-info' {
  export const parseURL: (url: string) => ParsedUrl;
}
