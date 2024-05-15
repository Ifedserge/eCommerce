import { createBlock } from '../../../services/utilities/tags';
import { createFooter } from '../footer/footer';
import { Header } from '../header/header';
import { MainPage } from '../main-page/main-page';
import { BlockType } from '../../types/enums';
import '../../../../sass/main.scss';

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
