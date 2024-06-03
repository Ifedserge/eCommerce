import { Pages } from '../../components/types/enums';
import { IRouteInterface } from '../../components/types/interfaces';
import { checkLoginState } from '../utilities/checkLoginState';

export default class Router {
  private routes;

  constructor(routes: IRouteInterface[]) {
    this.routes = routes;

    document.addEventListener('DOMContentLoaded', () => {
      this.navigate(null);
    });

    window.onpopstate = this.navigate.bind(this);
  }

  navigate(url: PopStateEvent | string | null): void {
    if (typeof url === 'string') {
      window.history.pushState(null, `${url}`, `/${url}`);
    }
    this.urlChangedHandler();
  }

  private urlChangedHandler(): void {
    if (window.location.pathname === '/') {
      window.history.pushState(null, 'index', '/index');
    }

    const route = this.routes.find((item) => window.location.pathname.slice(1).includes(item.path));

    if (
      !route ||
      (checkLoginState() && (route.path === Pages.login || route.path === Pages.registration))
    ) {
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
