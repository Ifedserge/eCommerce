import { basket } from '../../../../services/utilities/SVGs';
import { convertPrice } from '../../../../services/utilities/convertPrice';
import {
  createBlock,
  createButton,
  createDel,
  createHeading,
  createImg,
  createP,
  createSpan,
} from '../../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../../types/enums';
import { IProductAllData, IProductData } from '../../../types/interfaces';
import { handleAddProductToCart } from '../../../../services/utilities/handleAddProductToCart';

export class Card {
  private data;

  private wrapper = createBlock(BlockType.div, ['card']);

  basketWrapper = createButton(['card__basket-button'], '');

  constructor(data: IProductData | IProductAllData) {
    this.data = data;

    this.wrapper.addEventListener('click', () => {
      window.location.pathname = `/product/${data.id}`;
    });
  }

  createCard() {
    const imgWrapper = createBlock(BlockType.div, ['card__img-wrapper']);

    let img: HTMLElement;
    let name: HTMLElement;
    let priceStr: string;
    let description: HTMLElement;

    const priceBlock = createBlock(BlockType.div, ['card__price-block']);

    if (JSON.stringify(this.data).includes('masterData')) {
      const newData = this.data as IProductAllData;
      img = createImg(
        ['card__img'],
        newData.masterData.current.masterVariant.images[0].url,
        newData.masterData.current.name['en-GB']
      );
      name = createHeading(
        ['card__name', 'text', 'text_normal'],
        newData.masterData.current.name['en-GB'],
        HeadingType.h3
      );
      priceStr = convertPrice(
        newData.masterData.current.masterVariant.prices[0].value.centAmount,
        newData.masterData.current.masterVariant.prices[0].value.fractionDigits
      );
      description = createP(
        ['card__description', 'text'],
        newData.masterData.current.metaDescription['en-GB']
      );
      if (newData.masterData.current.masterVariant.prices[0].discounted) {
        const priceElem = createDel(['card__old-price', 'text'], priceStr);
        const newPrice = convertPrice(
          newData.masterData.current.masterVariant.prices[0].discounted.value.centAmount,
          newData.masterData.current.masterVariant.prices[0].discounted.value.fractionDigits
        );
        const newPriceElem = createSpan(['card__new-price', 'text'], newPrice);
        priceBlock.append(priceElem, newPriceElem);
      } else {
        const priceElem = createP(['card__price', 'text'], priceStr);
        priceBlock.append(priceElem);
      }
    } else {
      const newData = this.data as IProductData;
      img = createImg(['card__img'], newData.masterVariant.images[0].url, newData.name['en-GB']);
      name = createHeading(
        ['card__name', 'text', 'text_normal'],
        newData.name['en-GB'],
        HeadingType.h3
      );
      priceStr = convertPrice(
        newData.masterVariant.prices[0].value.centAmount,
        newData.masterVariant.prices[0].value.fractionDigits
      );
      description = createP(['card__description', 'text'], newData.metaDescription['en-GB']);
      if (newData.masterVariant.prices[0].discounted) {
        const priceElem = createDel(['card__old-price', 'text'], priceStr);
        const newPrice = convertPrice(
          newData.masterVariant.prices[0].discounted.value.centAmount,
          newData.masterVariant.prices[0].discounted.value.fractionDigits
        );
        const newPriceElem = createSpan(['card__new-price', 'text'], newPrice);
        priceBlock.append(priceElem, newPriceElem);
      } else {
        const priceElem = createP(['card__price', 'text'], priceStr);
        priceBlock.append(priceElem);
      }
    }

    this.basketWrapper.innerHTML = basket;
    this.basketWrapper.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.disableCard();
      handleAddProductToCart(this.data.id, true)
        .then(() => {
          const target = this.basketWrapper.firstChild?.lastChild!.previousSibling as HTMLElement;
          target.classList.add('card__disabled');
          this.basketWrapper.style.cursor = 'auto';
        })
        .catch(() => {
          this.enableCard();
        });
    });

    imgWrapper.append(img, this.basketWrapper);
    this.wrapper.append(imgWrapper, name, description, priceBlock);

    return this.wrapper;
  }

  disableCard(): void {
    this.basketWrapper.style.cursor = 'wait';
    this.basketWrapper.setAttribute('disabled', '');
  }

  enableCard(): void {
    this.basketWrapper.style.cursor = 'pointer';
    this.basketWrapper.removeAttribute('disabled');
  }
}
