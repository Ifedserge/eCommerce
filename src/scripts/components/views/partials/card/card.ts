import {
  createBlock,
  createHeading,
  createImg,
  createP,
} from '../../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../../types/enums';

interface Price {
  id: string;
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface ProductData {
  masterVariant: {
    images: { url: string }[];
    prices: Price[];
  };
  name: {
    'en-GB': string;
    ru: string;
  };
  slug: {
    'en-GB': string;
    ru: string;
  };
}

export function createCard(data: ProductData): HTMLElement {
  const wrapper = createBlock(BlockType.div, ['card']);
  const img = createImg(['card__img'], data.masterVariant.images[0].url, data.name['en-GB']);
  const name = createHeading(
    ['card__name', 'text', 'text_normal'],
    data.name['en-GB'],
    HeadingType.h3
  );
  const priceWithoutCent =
    data.masterVariant.prices[0].value.centAmount /
    10 ** data.masterVariant.prices[0].value.fractionDigits;
  const priceStr = '$' + String(priceWithoutCent.toFixed(2));
  const priceElem = createP(['card__price'], priceStr);
  wrapper.append(img, name, priceElem);
  return wrapper;
}
