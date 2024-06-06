import { Category } from '@commercetools/platform-sdk';
import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/partials/footer/footer';
import { Header } from '../views/partials/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType, IdCategories, Pages } from '../types/enums';
import Router from '../../services/router/router';
import { Login } from '../views/login/login';
import { createNotFoundPage } from '../views/not-found/not-found';
import { ICategory, IRouteInterface } from '../types/interfaces';
import Registration from '../views/registration/registration';
import { Catalogue } from '../views/catalogue/catalogue';
import ProductPage from '../views/product/productPage';
import { getCategories } from '../../services/utilities/getDataFunctions';
import { UserProfile } from '../views/userProfile/userProfile';

export class App {
  routes = this.createRoutes();

  router = new Router(this.routes);

  header: Header | null = null;

  main = createBlock(BlockType.main, ['main']);

  categories: ICategory[] = [];

  constructor() {
    window.addEventListener('load', () => {
      const path = window.location.pathname.slice(1);
      this.router.navigate(path);
    });
  }

  setCategories(data: Category[]): void {
    data.forEach((item) => {
      const category: ICategory = {
        name: item.name['en-GB'],
        id: item.id,
        slug: item.slug['en-GB'],
      };
      if (item.parent) category.parent = item.parent.id;
      (this.categories as ICategory[]).push(category);
    });
  }

  start(): void {
    this.header = new Header(this.router, this.updateHeader.bind(this));
    const header = this.header.createLayout();
    const mainPage = new MainPage(this.router).createLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);

    getCategories(this.setCategories.bind(this));
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
        callback: () =>
          this.changePage(new Catalogue(false, Pages.catalogue).createLayout([], 'none')),
      },
      {
        path: `${Pages.catalogue}/${Pages.man}`,
        callback: () =>
          this.changePage(new Catalogue(true, Pages.man).createLayout(['Man'], IdCategories.man)),
      },
      {
        path: `${Pages.catalogue}/${Pages.man_jeans}`,
        callback: () =>
          this.changePage(
            new Catalogue(true, Pages.man_jeans).createLayout(
              ['Man', 'Jeans'],
              IdCategories.man_jeans
            )
          ),
      },
      {
        path: `${Pages.catalogue}/${Pages.man_jackets}`,
        callback: () =>
          this.changePage(
            new Catalogue(true, Pages.man_jackets).createLayout(
              ['Man', 'Jackets'],
              IdCategories.man_jackets
            )
          ),
      },
      {
        path: `${Pages.catalogue}/${Pages.woman}`,
        callback: () =>
          this.changePage(
            new Catalogue(true, Pages.woman).createLayout(['Woman'], IdCategories.woman)
          ),
      },
      {
        path: `${Pages.catalogue}/${Pages.woman_jeans}`,
        callback: () =>
          this.changePage(
            new Catalogue(true, Pages.woman_jeans).createLayout(
              ['Woman', 'Jeans'],
              IdCategories.woman_jeans
            )
          ),
      },
      {
        path: `${Pages.catalogue}/${Pages.woman_jackets}`,
        callback: () =>
          this.changePage(
            new Catalogue(true, Pages.woman_jackets).createLayout(
              ['Woman', 'Jackets'],
              IdCategories.woman_jackets
            )
          ),
      },
      {
        path: `${Pages.product}`,
        callback: async () => {
          const productPage = await ProductPage.render();
          this.changePage(productPage);
        },
      },
      {
        path: `${Pages.user}`,
        callback: () => this.changePage(UserProfile.render()),
      },
      {
        path: `${Pages.notFound}`,
        callback: () => this.changePage(createNotFoundPage(this.router)),
      },
    ];
  }
}
