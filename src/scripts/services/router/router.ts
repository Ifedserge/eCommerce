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
    if (window.location.pathname === '/') this.navigate(Pages.index);
    const urlString = window.location.pathname.slice(1);

    const result = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    const route = this.routes.find((item) => urlString.includes(item.path));
    if (route && urlString.length > 22) route.callback();
    else this.urlChangedHandler(result);
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
