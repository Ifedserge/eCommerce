import { createBlock, createHeading, createP } from '../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../types/enums';
import { getProductById } from '../../../services/utilities/getProductById';
import { productSlider } from '../../../services/utilities/productSlide';

export default class ProductPage {
  static async render(): Promise<HTMLElement> {
    const productId = window.location.pathname.split('/').pop() || '';
    const data = await getProductById(productId);

    const wrapper = createBlock(BlockType.div, ['product-page']);

    const slider = productSlider(data.masterVariant.images);
    const imgWrapper = createBlock(BlockType.div, ['product-page__img']);
    imgWrapper.append(slider);

    const infoBlock = createBlock(BlockType.div, ['info-block']);
    const name = createHeading(
      ['product-page__name', 'text', 'text_large'],
      data.name['en-GB'],
      HeadingType.h1
    );
    const description = createBlock(BlockType.div, ['product-page__description', 'text']);
    description.innerHTML = data.description['en-GB'];
    const price = createP(
      ['product-page__price', 'text'],
      `${data.masterVariant.prices[0].value.currencyCode} ${data.masterVariant.prices[0].value.centAmount / 100}`
    );

    infoBlock.append(name, description, price);
    wrapper.append(imgWrapper, infoBlock);

    return wrapper;
  }
}
