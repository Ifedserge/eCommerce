import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/partials/footer/footer';
import { Header } from '../views/partials/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType, Pages } from '../types/enums';
import Router from '../../router/router';
import { Login } from '../views/login/login';
import { createNotFoundPage } from '../views/not-found/not-found';
import { RouteInterface } from '../types/interfaces';
import Registration from '../views/registration/registration';

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
    this.header = new Header(this.router, this.checkLoginState(), this.updateHeader.bind(this));
    const header = this.header.createLayout();
    const mainPage = MainPage.createLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);
  }

  checkLoginState(): boolean {
    const storage = window.localStorage;
    if (storage.expirationTime && storage.refreshToken && storage.token) return true;
    return false;
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

  createRoutes(): RouteInterface[] {
    return [
      {
        path: '',
        callback: () => this.changePage(MainPage.createLayout()),
      },
      {
        path: `${Pages.index}`,
        callback: () => this.changePage(MainPage.createLayout()),
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
        path: `${Pages.notFound}`,
        callback: () => this.changePage(createNotFoundPage(this.router)),
      },
    ];
  }
}
