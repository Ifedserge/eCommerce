import { Pages } from '../components/types/enums';
import { RouteInterface } from '../components/types/interfaces';

export default class Router {
  private routes;

  constructor(routes: RouteInterface[]) {
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

  urlChangedHandler(): void {
    const route = this.routes.find((item) => item.path === window.location.pathname.slice(1));

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }
    route.callback();
  }

  redirectToNotFoundPage() {
    const notFoundPage = this.routes.find((item) => item.path === Pages.notFound);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
