import { Pages } from '../../components/types/enums';
import { IPathResource, IRouteInterface } from '../../components/types/interfaces';

export default class Router {
  private routes;

  constructor(routes: IRouteInterface[]) {
    this.routes = routes;

    document.addEventListener('DOMContentLoaded', () => {
      this.navigate(null);
    });

    window.onpopstate = this.navigate.bind(this);
  }

  navigate(url: PopStateEvent | string | null) {
    if (typeof url === 'string') {
      window.history.pushState(null, `${url}`, `/${url}`);
    }
    const urlString = window.location.pathname.slice(1);

    const result = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    this.checkCard();

    this.urlChangedHandler(result);
  }

  checkCard(): void {
    const path = window.location.pathname.slice(1);
    const route = this.routes.find((item) => path.includes(item.path));
    if (route && path.length > 20) route.callback();
  }

  private urlChangedHandler(requestParams: IPathResource) {
    let pathForFind = '';
    if (requestParams.resource === '') pathForFind = requestParams.path;
    else pathForFind = `${requestParams.path}/${requestParams.resource}`;
    const route = this.routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback();
  }

  private redirectToNotFoundPage() {
    const notFoundPage = this.routes.find((item) => item.path === Pages.notFound);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
