import { createBlock } from '../../services/utilities/tags';
import { createFooter } from '../views/footer/footer';
import { Header } from '../views/header/header';
import { MainPage } from '../views/main-page/main-page';
import { BlockType } from '../types/enums';
import '../../../sass/main.scss';

export class App {
  private header = new Header();

  private main = createBlock(BlockType.main, ['main']);

  constructor() {}

  start(): void {
    const header = this.header.getLayout();
    const mainPage = new MainPage().getLayout();
    this.main.append(mainPage);
    const footer = createFooter();
    document.body.append(header, this.main, footer);
  }
}
