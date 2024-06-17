import {
  createBlock,
  createHeading,
  createP,
  createDel,
  createSpan,
  createButton,
} from '../../../services/utilities/tags';
import { BlockType, HeadingType, Pages } from '../../types/enums';
import { getProductById } from '../../../services/utilities/getProductById';
import { productSlider } from '../../../services/utilities/productSlide';
import { convertPrice } from '../../../services/utilities/convertPrice';
// import { handleAddProductToCart, checkProductInCart } from '../../../services/utilities/cartHandler';
import { handleAddProductToCart } from '../../../services/utilities/handleAddProductToCart';
import { checkProductInCart } from '../../../services/utilities/checkProductInCart';

export default class ProductPage {
  static async render(): Promise<HTMLElement> {
    const productId = window.location.pathname.split('/').pop() || '';
    const wrapper = createBlock(BlockType.div, ['product-page']);
    try {
      const data = await getProductById(productId);

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

      const priceWrapper = createBlock(BlockType.div, ['product-page__price-wrapper']);
      const price = data.masterVariant.prices[0];

      const formattedPrice = convertPrice(price.value.centAmount, price.value.fractionDigits);

      if (price.discounted) {
        const oldPrice = createDel(
          ['product-page__price', 'product-page__price--old'],
          formattedPrice
        );
        const discountedPrice = convertPrice(
          price.discounted.value.centAmount,
          price.discounted.value.fractionDigits
        );
        const newPrice = createSpan(
          ['product-page__price', 'product-page__price--new'],
          discountedPrice
        );
        priceWrapper.append(oldPrice, newPrice);
      } else {
        const regularPrice = createP(['product-page__price'], formattedPrice);
        priceWrapper.append(regularPrice);
      }

      const addToCartBtn = createButton(
        ['registration-form__button', 'text', 'text_bold'],
        'Add to cart'
      );
      const productInCart = await checkProductInCart(productId);
      if (productInCart) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Added';
      } else {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'Add to cart';
        addToCartBtn.addEventListener('click', async () => {
          await handleAddProductToCart(productId);
          const updatedProductInCart = await checkProductInCart(productId);
          if (updatedProductInCart) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Added';
          }
        });
      }

      infoBlock.append(name, description, priceWrapper, addToCartBtn);
      wrapper.append(imgWrapper, infoBlock);
    } catch {
      window.location.pathname = Pages.notFound;
    }
    return wrapper;
  }
}
