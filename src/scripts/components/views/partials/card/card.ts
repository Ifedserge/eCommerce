import { basket } from '../../../../services/utilities/SVGs';
import { addGoodHandler } from '../../../../services/utilities/basketDataFunctions';
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

export function createCard(data: IProductData | IProductAllData): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['card']);

  wrapper.addEventListener('click', (e: Event) => {
    const elem = e.target as HTMLElement;
    elem.classList.contains;
    if (elem.classList.contains('card__basket-button') || elem.classList.contains('basket')) {
      addGoodHandler();
      return;
    }
    window.location.pathname = `/product/${data.id}`;
  });

  const imgWrapper = createBlock(BlockType.div, ['card__img-wrapper']);

  let img: HTMLElement;
  let name: HTMLElement;
  let priceStr: string;
  let description: HTMLElement;

  const priceBlock = createBlock(BlockType.div, ['card__price-block']);

  if (JSON.stringify(data).includes('masterData')) {
    const newData = data as IProductAllData;
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
    const newData = data as IProductData;
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

  const basketWrapper = createButton(['card__basket-button'], '');
  basketWrapper.innerHTML = basket;

  imgWrapper.append(img, basketWrapper);
  wrapper.append(imgWrapper, name, description, priceBlock);

  return wrapper;
}
