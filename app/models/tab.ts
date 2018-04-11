export type Tab = {
  url: string,
  currentUrl: string,
  selected: boolean,
  id: number,
  shouldGoBack: boolean,
  shouldGoForward: boolean,
  visitId?: number,
  canGoBack?: boolean,
  canGoForward?: boolean,
};
