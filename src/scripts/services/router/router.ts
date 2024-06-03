import { Pages } from '../../components/types/enums';
import { IPathResource, IRouteInterface } from '../../components/types/interfaces';
import HistoryRouterHandler from './history-router-handler';

export default class Router {
  private routes;

  private handler;

  constructor(routes: IRouteInterface[]) {
    this.routes = routes;

    this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.navigate(null);
    });
  }

  navigate(url: PopStateEvent | string | null) {
    this.handler.navigate(url);
  }

  // private urlChangedHandler(): void {
  //   if (window.location.pathname === '/') {
  //     window.history.pushState(null, 'index', '/index');
  //   }

  //   const route = this.routes.find((item) => window.location.pathname.slice(1).includes(item.path));
  urlChangedHandler(requestParams: IPathResource) {
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
