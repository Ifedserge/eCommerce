import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import {
  getCatalogueData,
  getProducts,
  sortCards,
} from '../../../services/utilities/getDataFunctions';
import {
  createBlock,
  createButton,
  createHeading,
  createImg,
  createSpan,
} from '../../../services/utilities/tags';
import {
  BlockType,
  HeadingType,
  IdCategories,
  Pages,
  SortButtonText,
  SortPriceButtonText,
  SortType,
  SortingValue,
} from '../../types/enums';
import { createCard } from '../partials/card/card';

export class Catalogue {
  isChosenSex = false;

  private categoryId = '';

  private sortNameType = SortType.none;

  private sortPriceType = SortType.none;

  private page = Pages.catalogue;

  private cardsBlock = createBlock(BlockType.div, ['catalogue__cards']);

  private manageBlock = this.createManageBlock();

  private anonApi;

  constructor(isChosenSex: boolean, page: Pages, anonApi: ByProjectKeyRequestBuilder) {
    this.isChosenSex = isChosenSex;
    this.page = page;
    this.anonApi = anonApi;
  }

  createLayout(paths: string[], categoryId: string): HTMLElement {
    const block = createBlock(BlockType.section, ['catalogue']);
    block.append(this.createNavBlock(paths), this.manageBlock, this.cardsBlock);
    this.openPage(this.page, categoryId);
    this.categoryId = categoryId;
    return block;
  }

  openPage(name: string, categoryId: string): void {
    switch (name) {
      case Pages.catalogue: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = '';
        getProducts(createCard, this.cardsBlock, this.anonApi);
        break;
      }
      case Pages.man: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
        break;
      }
      case Pages.man_jeans: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man_jeans;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
        break;
      }
      case Pages.man_jackets: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man_jackets;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
        break;
      }
      case Pages.woman: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
        break;
      }
      case Pages.woman_jeans: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman_jeans;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
        break;
      }
      case Pages.woman_jackets: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman_jackets;
        getCatalogueData(createCard, this.cardsBlock, categoryId, this.anonApi);
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

  createManageBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__filter']);

    wrapper.append(this.createSortNameBlock(), this.createSortPriceBlock());
    return wrapper;
  }

  createSortNameBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__sort-name']);
    switch (this.sortNameType) {
      case SortType.asc: {
        const sortNameButton = createButton(
          ['catalogue__sort-name-button', 'text', 'text_normal'],
          SortButtonText.asc
        );
        wrapper.append(sortNameButton);
        sortNameButton.addEventListener('click', () => {
          this.sortNameType = SortType.desc;
          this.sortCategory(SortingValue.name, SortType.desc);
        });
        break;
      }
      case SortType.desc: {
        const sortNameButton = createButton(
          ['catalogue__sort-name-button', 'text', 'text_normal'],
          SortButtonText.desc
        );
        wrapper.append(sortNameButton);
        sortNameButton.addEventListener('click', () => {
          this.sortNameType = SortType.asc;
          this.sortCategory(SortingValue.name, SortType.asc);
        });
        break;
      }
      default: {
        const sortNameButton = createButton(
          ['catalogue__sort-name-button', 'text', 'text_normal', 'inactive'],
          SortButtonText.asc
        );
        sortNameButton.addEventListener('click', () => {
          this.sortNameType = SortType.desc;
          this.sortCategory(SortingValue.name, SortType.desc);
        });
        wrapper.append(sortNameButton);
      }
    }
    return wrapper;
  }

  createSortPriceBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__sort-price']);
    switch (this.sortPriceType) {
      case SortType.asc: {
        const sortNameButton = createButton(
          ['catalogue__sort-price-button', 'text', 'text_normal'],
          SortPriceButtonText.chip
        );
        wrapper.append(sortNameButton);
        sortNameButton.addEventListener('click', () => {
          this.sortPriceType = SortType.desc;
          this.sortCategory(SortingValue.price, SortType.desc);
        });
        break;
      }
      case SortType.desc: {
        const sortNameButton = createButton(
          ['catalogue__sort-price-button', 'text', 'text_normal'],
          SortPriceButtonText.expensive
        );
        wrapper.append(sortNameButton);
        sortNameButton.addEventListener('click', () => {
          this.sortPriceType = SortType.asc;
          this.sortCategory(SortingValue.price, SortType.asc);
        });
        break;
      }
      default: {
        const sortNameButton = createButton(
          ['catalogue__sort-price-button', 'text', 'text_normal', 'inactive'],
          SortPriceButtonText.chip
        );
        sortNameButton.addEventListener('click', () => {
          this.sortPriceType = SortType.desc;
          this.sortCategory(SortingValue.price, SortType.desc);
        });
        wrapper.append(sortNameButton);
      }
    }
    return wrapper;
  }

  sortCategory(sortingValue: SortingValue, sortingType: SortType): void {
    this.manageBlock.innerHTML = '';
    this.manageBlock.append(this.createSortNameBlock(), this.createSortPriceBlock());
    this.cardsBlock.innerHTML = '';
    sortCards(
      sortingValue,
      this.categoryId,
      sortingType,
      createCard,
      this.cardsBlock,
      this.anonApi
    );
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
