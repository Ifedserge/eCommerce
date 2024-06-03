import { IPathResource } from '../../components/types/interfaces';

export default class HistoryRouterHandler {
  private callback;

  handler;

  constructor(callback: (data: IPathResource) => void) {
    this.callback = callback;
    this.handler = this.navigate.bind(this);

    window.addEventListener('popstate', this.handler);
  }

  navigate(url: PopStateEvent | string | null) {
    if (typeof url === 'string') {
      window.history.pushState(null, 'null', `/${url}`);
    }
    const urlString = window.location.pathname.slice(1);

    const result = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    this.callback(result);
  }
}
