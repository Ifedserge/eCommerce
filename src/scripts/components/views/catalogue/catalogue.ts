import { getCatalogueDataMan } from '../../../services/utilities/getDataFunctions';
import Router from '../../../services/router/router';
import {
  createBlock,
  createButton,
  createHeading,
  createImg,
  createP,
} from '../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../types/enums';
import { createCard } from '../partials/card/card';

export class Catalogue {
  private router;

  private cardsBlock = createBlock(BlockType.div, ['catalogue__cards']);

  constructor(router: Router) {
    this.router = router;
  }

  createLayout(paths: string[]): HTMLElement {
    const block = createBlock(BlockType.section, ['catalogue']);
    block.append(this.createNavBlock(paths), this.createFilter(), this.cardsBlock);
    getCatalogueDataMan(createCard, this.cardsBlock);
    return block;
  }

  createNavBlock(path: string[]): HTMLElement {
    const block = createBlock(BlockType.div, ['catalogue__navigation']);

    const wrapper = createBlock(BlockType.div, ['catalogue__nav-wrapper']);
    block.append(wrapper);

    const pathWrapper = createBlock(BlockType.div, ['catalogue__path-wrapper']);
    const pathBlock = createBlock(BlockType.div, ['catalogue__path-block']);
    const paths = path.filter((item) => item);
    paths.unshift('All categories');
    paths.forEach((item, index) => {
      const button = createButton(['catalogue__path-button'], item);
      if (index < paths.length && paths.length !== 1) {
        const slash = createP(['catalogue__slash'], '/');
        pathBlock.append(slash);
      }
      pathBlock.append(button);
    });
    const heading = createHeading(
      ['catalogue__heading', 'text'],
      `Denim Collection\nFall 2024`,
      HeadingType.h1
    );
    pathWrapper.append(pathBlock, heading);

    const imgWrapper = createBlock(BlockType.div, ['catalogue__nav-img-wrapper']);
    const slogan = createImg(
      ['catalogue__nav-img'],
      '../../../../assets/nav-slogan.png',
      'We see what we want'
    );
    const tracery = createImg(
      ['catalogue__nav-tracery-first', 'tracery'],
      '../../../../assets/tracery.png',
      'tracery'
    );
    const tracery2 = createImg(
      ['catalogue__nav-tracery-second', 'tracery'],
      '../../../../assets/tracery.png',
      'tracery'
    );

    imgWrapper.append(tracery, slogan, tracery2);

    wrapper.append(pathWrapper, imgWrapper);

    return block;
  }

  createFilter(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__filter']);

    return wrapper;
  }

  createCardsBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__cards']);
    return wrapper;
  }
}
