import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/footer/footer';
import { Header } from '../views/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType } from '../types/enums';

export class App {
  static header = new Header();

  static main = createBlock(BlockType.main, ['main']);

  constructor() {}

  static start(): void {
    const header = this.header.getLayout();
    const mainPage = new MainPage().getLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);
  }
}
