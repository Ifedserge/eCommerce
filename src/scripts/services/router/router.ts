// import { Pages } from '../../components/types/enums';
// import { IRouteInterface } from '../../components/types/interfaces';
// import { checkLoginState } from '../utilities/checkLoginState';

// export default class Router {
//   private routes: IRouteInterface[];

//   constructor(routes: IRouteInterface[]) {
//     this.routes = routes;

//     document.addEventListener('DOMContentLoaded', () => {
//       this.urlChangedHandler();
//     });

//     window.onpopstate = () => {
//       this.urlChangedHandler();
//     };
//   }

//   navigate(url: string): void {
//     window.history.pushState(null, '', url);
//     this.urlChangedHandler();
//   }

//   private urlChangedHandler(): void {
//     const path = window.location.pathname.slice(1);
//     const params = path.split('/');
//     const route = this.routes.find((item) => {
//       const routeSegments = item.path.split('/');
//       if (routeSegments.length !== params.length + 1) return false;
//       return routeSegments.every((seg, index) => seg.startsWith(':') || seg === params[index]);
//     });

//     if (
//       !route ||
//       (checkLoginState() && (route.path === Pages.login || route.path === Pages.registration))
//     ) {
//       this.redirectToNotFoundPage();
//       return;
//     }

//     const paramsObject = route.path.split('/').reduce((acc, segment, index) => {
//       if (segment.startsWith(':')) {
//         return { ...acc, [segment.slice(1)]: params[index] };
//       }
//       return acc;
//     }, {} as { [key: string]: string });

//     route.callback(paramsObject);
//   }

//   private redirectToNotFoundPage() {
//     if (window.location.pathname !== `/${Pages.notFound}`) {
//       this.navigate(`/${Pages.notFound}`);
//     }
//   }
// }
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
    const route = this.routes.find((item) => item.path === window.location.pathname.slice(1));

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
