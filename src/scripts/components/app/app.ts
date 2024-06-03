import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/partials/footer/footer';
import { Header } from '../views/partials/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType, Pages } from '../types/enums';
import Router from '../../services/router/router';
import { Login } from '../views/login/login';
import { createNotFoundPage } from '../views/not-found/not-found';
import { IRouteInterface } from '../types/interfaces';
import Registration from '../views/registration/registration';
import { Catalogue } from '../views/catalogue/catalogue';
import ProductPage from '../views/product/productPage';

export class App {
  routes = this.createRoutes();

  router = new Router(this.routes);

  header: Header | null = null;

  main = createBlock(BlockType.main, ['main']);

  constructor() {
    window.addEventListener('load', () => {
      const path = window.location.pathname.slice(1);
      this.router.navigate(path);
    });
  }

  start(): void {
    this.header = new Header(this.router, this.updateHeader.bind(this));
    const header = this.header.createLayout();
    const mainPage = new MainPage(this.router).createLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);
  }

  updateHeader(): void {
    const headerBlock = document.querySelector('.header');
    if (!headerBlock) return;
    headerBlock.remove();
    if (!this.header) return;
    const newHeaderBlock = this.header.createLayout();
    document.body.prepend(newHeaderBlock);
  }

  changePage(layout: HTMLElement): void {
    this.main.innerHTML = '';
    this.main.append(layout);
  }

  createRoutes(): IRouteInterface[] {
    return [
      {
        path: '',
        callback: () => this.changePage(new MainPage(this.router).createLayout()),
      },
      {
        path: `${Pages.index}`,
        callback: () => this.changePage(new MainPage(this.router).createLayout()),
      },
      {
        path: `${Pages.login}`,
        callback: () => this.changePage(Login.render()),
      },
      {
        path: `${Pages.registration}`,
        callback: () => this.changePage(Registration.render()),
      },
      {
        path: `${Pages.catalogue}`,
        callback: () => this.changePage(new Catalogue(this.router).createLayout([])),
      },
      {
        path: `${Pages.man}`,
        callback: () => this.changePage(new Catalogue(this.router).createLayout(['Man'])),
      },
      {
        path: `${Pages.man_jeans}`,
        callback: () => this.changePage(new Catalogue(this.router).createLayout(['Man', 'Jeans'])),
      },
      {
        path: `${Pages.man_jackets}`,
        callback: () =>
          this.changePage(new Catalogue(this.router).createLayout(['Man', 'Jackets'])),
      },
      {
        path: `${Pages.woman}`,
        callback: () => this.changePage(new Catalogue(this.router).createLayout(['Woman'])),
      },
      {
        path: `${Pages.woman_jeans}`,
        callback: () =>
          this.changePage(new Catalogue(this.router).createLayout(['Woman', 'Jeans'])),
      },
      {
        path: `${Pages.woman_jackets}`,
        callback: () =>
          this.changePage(new Catalogue(this.router).createLayout(['Woman', 'Jackets'])),
      },
      {
        path: `${Pages.notFound}`,
        callback: () => this.changePage(createNotFoundPage(this.router)),
      },
      {
        path: `${Pages.product}/id`,
        callback: () => this.changePage(ProductPage.render()),
      },
    ];
  }
}
