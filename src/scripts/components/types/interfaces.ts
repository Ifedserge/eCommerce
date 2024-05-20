export interface TagAttributes {
  name: string;
  value?: string;
}

export interface RouteInterface {
  path: string;
  callback: () => void;
}

export interface Router {
  navigate: (url: string) => void;
}
