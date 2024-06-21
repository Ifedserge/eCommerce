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

export class Catalogue {
  isChosenSex = false;

  private categoryId = '';

  private sortNameType = SortType.none;

  private sortPriceType = SortType.none;

  private page = Pages.catalogue;

  private block = createBlock(BlockType.section, ['catalogue']);

  private cardsBlock = createBlock(BlockType.div, ['catalogue__cards']);

  private manageBlock = this.createManageBlock();

  private totalCards = 0;

  constructor(isChosenSex: boolean, page: Pages) {
    this.isChosenSex = isChosenSex;
    this.page = page;
  }

  createLayout(paths: string[], categoryId: string): HTMLElement {
    //debugger;
    this.block.append(this.createNavBlock(paths), this.manageBlock, this.cardsBlock);
    this.openPage(this.page, categoryId);
    this.categoryId = categoryId;
    return this.block;
  }

  openPage(name: string, categoryId: string): void {
    switch (name) {
      case Pages.catalogue: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = '';
        getProducts(this.cardsBlock);
        break;
      }
      case Pages.man: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      case Pages.man_jeans: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man_jeans;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      case Pages.man_jackets: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.man_jackets;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      case Pages.woman: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      case Pages.woman_jeans: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman_jeans;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      case Pages.woman_jackets: {
        this.cardsBlock.innerHTML = '';
        this.categoryId = IdCategories.woman_jackets;
        getCatalogueData(this.cardsBlock, categoryId, this.updateTotalCards.bind(this));
        break;
      }
      default:
        break;
    }
  }

  createNavBlock(path: string[]): HTMLElement {
    //debugger;
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
    sortCards(sortingValue, this.categoryId, sortingType, this.cardsBlock);
  }

  createCardsBlock(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__cards']);
    return wrapper;
  }

  createSubCategories(path: string[]): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['catalogue__sub-categories']);
    if (!this.isChosenSex) {
      const manButton = createButton(['catalogue__button', 'text', 'text_normal'], Pages.man);
      manButton.addEventListener('click', () => this.redirect.call(this, 'man'));
      const womanButton = createButton(['catalogue__button', 'text', 'text_normal'], Pages.woman);
      womanButton.addEventListener('click', () => this.redirect.call(this, 'woman'));
      wrapper.append(manButton, womanButton);
    } else if (path.length === 1) {
      const jeansButton = createButton(['catalogue__button', 'text', 'text_normal'], 'jeans');
      jeansButton.addEventListener('click', () => {
        if (path[0] === 'Man') this.redirect.call(this, Pages.man_jeans);
        else this.redirect.call(this, Pages.woman_jeans);
      });
      const jacketsButton = createButton(['catalogue__button', 'text', 'text_normal'], 'jackets');
      jacketsButton.addEventListener('click', () => {
        if (path[0] === 'Man') this.redirect.call(this, Pages.man_jackets);
        else this.redirect.call(this, Pages.woman_jackets);
      });
      wrapper.append(jeansButton, jacketsButton);
    }
    return wrapper;
  }

  private redirect(path: string): void {
    window.location.pathname = `catalogue/${path}`;
  }

  updateTotalCards(num: number, offset: number | undefined): void {
    this.totalCards = num;
    document.querySelector('.pagination')?.remove();
    if (num < 10) return;
    this.block.append(this.addPaginationBlock(num, offset));
  }

  addPaginationBlock(num: number, offset: number | undefined): HTMLElement {
    const block = createBlock(BlockType.div, ['pagination']);
    const numOfButtons = Math.round(num / 10);
    for (let i = 0; i < numOfButtons; i += 1) {
      const button = createButton(['pagination__button', 'text', 'text-normal'], `${i + 1}`);
      if (offset! / 10 === i || (offset === undefined && i === 0)) {
        button.setAttribute('disabled', '');
        button.classList.add('disabled');
      } else button.addEventListener('click', () => this.openNextPagiPage(i));
      block.append(button);
    }
    return block;
  }

  openNextPagiPage(num: number): void {
    this.cardsBlock.innerHTML = '';
    getCatalogueData(this.cardsBlock, this.categoryId, this.updateTotalCards.bind(this), num * 10);
  }
}
