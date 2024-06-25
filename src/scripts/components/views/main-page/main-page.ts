import Router from '../../../services/router/router';
import {
  createBlock,
  createButton,
  createHeading,
  createImg,
  createP,
} from '../../../services/utilities/tags';
import { BlockType, HeadingType, Pages } from '../../types/enums';

export class MainPage {
  private router;

  constructor(router: Router) {
    this.router = router;
  }

  createLayout(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['main-page']);

    wrapper.append(this.createPreviewBlock());
    return wrapper;
  }

  createPreviewBlock(): HTMLElement {
    const preview = createBlock(BlockType.section, ['main-page__preview']);

    const infoBlock = createBlock(BlockType.div, ['main-page__preview-info']);
    const slogan = createP(['main-page__slogan', 'text', 'text_normal'], 'The quality you deserve');
    const heading = createHeading(['main-page__heading', 'text'], 'DENIM', HeadingType.h1);
    const linkCatalogue = createButton(
      ['main-page__catalogue-link', 'text', 'text_bold'],
      'Check new collection'
    );
    linkCatalogue.addEventListener('click', () => this.router.navigate(Pages.catalogue));
    infoBlock.append(slogan, heading, linkCatalogue);

    const imgWrapper = createBlock(BlockType.div, ['main-page__preview-imgs']);
    const photo = createImg(
      ['main-page__preview-img'],
      '../../../../assets/main-page-photo.png',
      'Matheus Ferrero'
    );
    const tracery = createImg(
      ['main-page__preview-tracery-first', 'tracery'],
      '../../../../assets/tracery.png',
      'tracery'
    );
    const tracery2 = createImg(
      ['main-page__preview-tracery-second', 'tracery'],
      '../../../../assets/tracery.png',
      'tracery'
    );

    imgWrapper.append(tracery, photo, tracery2);

    preview.append(infoBlock, imgWrapper);
    return preview;
  }
}
