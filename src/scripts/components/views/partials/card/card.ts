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
import { IProductData } from '../../../types/interfaces';

export function createCard(data: IProductData): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['card']);

  const imgWrapper = createBlock(BlockType.div, ['card__img-wrapper']);
  const img = createImg(['card__img'], data.masterVariant.images[0].url, data.name['en-GB']);

  const basketWrapper = createButton(['card__basket-button'], '');
  basketWrapper.innerHTML = basket;

  imgWrapper.append(img, basketWrapper);

  const name = createHeading(
    ['card__name', 'text', 'text_normal'],
    data.name['en-GB'],
    HeadingType.h3
  );

  const priceBlock = createBlock(BlockType.div, ['card__price-block']);

  const priceStr = convertPrice(
    data.masterVariant.prices[0].value.centAmount,
    data.masterVariant.prices[0].value.fractionDigits
  );

  if (data.masterVariant.prices[0].discounted) {
    const priceElem = createDel(['card__old-price', 'text'], priceStr);
    const newPrice = convertPrice(
      data.masterVariant.prices[0].discounted.value.centAmount,
      data.masterVariant.prices[0].discounted.value.fractionDigits
    );
    const newPriceElem = createSpan(['card__new-price', 'text'], newPrice);
    priceBlock.append(priceElem, newPriceElem);
  } else {
    const priceElem = createP(['card__price', 'text'], priceStr);
    priceBlock.append(priceElem);
  }

  const description = createP(['card__description', 'text'], data.metaDescription['en-GB']);
  wrapper.append(imgWrapper, name, description, priceBlock);
  return wrapper;
}
