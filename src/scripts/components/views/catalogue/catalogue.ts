import { getCatalogueData, getProducts } from '../../../services/utilities/getDataFunctions';
import {
  createBlock,
  createButton,
  createHeading,
  createImg,
  createSpan,
} from '../../../services/utilities/tags';
import { BlockType, HeadingType, Pages } from '../../types/enums';
import { createCard } from '../partials/card/card';

export class Catalogue {
  private cardsBlock = createBlock(BlockType.div, ['catalogue__cards']);

  isChosenSex = false;

  private page;

  constructor(isChosenSex: boolean, page: Pages) {
    this.isChosenSex = isChosenSex;
    this.page = page;
  }

  createLayout(paths: string[], categoryId: string): HTMLElement {
    const block = createBlock(BlockType.section, ['catalogue']);
    block.append(this.createNavBlock(paths), this.createFilter(), this.cardsBlock);
    this.openPage(this.page, categoryId);
    return block;
  }

  openPage(name: string, categoryId: string): void {
    switch (name) {
      case Pages.catalogue: {
        this.cardsBlock.innerHTML = '';
        getProducts(createCard, this.cardsBlock);
        break;
      }
      case Pages.man: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      case Pages.man_jeans: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      case Pages.man_jackets: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      case Pages.woman: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      case Pages.woman_jeans: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      case Pages.woman_jackets: {
        this.cardsBlock.innerHTML = '';
        getCatalogueData(createCard, this.cardsBlock, categoryId);
        break;
      }
      default:
        break;
    }
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
      const button = createButton(['catalogue__button', 'text', 'text_normal'], item);
      button.addEventListener('click', () => {
        if (item === 'All categories') window.location.pathname = 'catalogue';
        if (item === 'Man') window.location.pathname = 'catalogue/man';
        if (item === 'Woman') window.location.pathname = 'catalogue/woman';
      });
      if (index < paths.length && paths.length !== 1) {
        const slash = createSpan(['catalogue__slash', 'text', 'text_normal'], '/');
        pathBlock.append(slash);
      }
      pathBlock.append(button);
    });
    const heading = createHeading(
      ['catalogue__heading', 'text'],
      `Denim Collection\nFall 2024`,
      HeadingType.h1
    );

    const subCategories = this.createSubCategories(path);
    pathWrapper.append(pathBlock, heading, subCategories);

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

  createSubCategories(path: string[]): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__sub-categories']);
    if (!this.isChosenSex) {
      const manButton = createButton(['catalogue__button', 'text', 'text_normal'], 'Man');
      manButton.addEventListener('click', () => this.redirect.call(this, 'man'));
      const womanButton = createButton(['catalogue__button', 'text', 'text_normal'], 'Woman');
      womanButton.addEventListener('click', () => this.redirect.call(this, 'woman'));
      wrapper.append(manButton, womanButton);
    } else if (path.length === 1) {
      const jeansButton = createButton(['catalogue__button', 'text', 'text_normal'], 'jeans');
      jeansButton.addEventListener('click', () => {
        if (path[0] === 'Man') this.redirect.call(this, 'man-jeans');
        else this.redirect.call(this, 'woman-jeans');
      });
      const jacketsButton = createButton(['catalogue__button', 'text', 'text_normal'], 'jackets');
      jacketsButton.addEventListener('click', () => {
        if (path[0] === 'Man') this.redirect.call(this, 'man-jackets');
        else this.redirect.call(this, 'woman-jackets');
      });
      wrapper.append(jeansButton, jacketsButton);
    }
    return wrapper;
  }

  private redirect(path: string): void {
    window.location.pathname = `catalogue/${path}`;
  }
}
