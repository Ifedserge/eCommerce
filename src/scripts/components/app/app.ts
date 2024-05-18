import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/partials/footer/footer';
import { Header } from '../views/partials/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType } from '../types/enums';

export class App {
  static header = new Header();

  static main = createBlock(BlockType.main, ['main']);

  constructor() {}

  static start(): void {
    const header = this.header.createLayout();
    const mainPage = MainPage.createLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);
  }
}
