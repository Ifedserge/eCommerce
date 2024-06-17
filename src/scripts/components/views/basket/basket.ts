import { Cart } from '@commercetools/platform-sdk';
import { createBlock, createP, createHeading } from '../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../types/enums';
import { Api } from '../../../services/api';
import { createNewCart } from '../../../services/utilities/createNewCart';
import { convertPrice } from '../../../services/utilities/convertPrice';

const getCartById = async (cartId: string): Promise<Cart | null> => {
  const response = await Api.createAnonClient().carts().withId({ ID: cartId }).get().execute();
  if (response.body.cartState === 'Active') {
    return response.body;
  }
  return null;
};

export class BasketPage {
  static async render(): Promise<HTMLElement> {
    const wrapper = createBlock(BlockType.div, ['basket']);
    const heading = createBlock(BlockType.div, ['basket__heading']);
    heading.textContent = 'CART';
    wrapper.append(heading);

    let cartId = localStorage.getItem('cartId');
    let cart = null;
    if (cartId) {
      cart = await getCartById(cartId);
    }

    if (!cart) {
      cart = await createNewCart();
      cartId = cart.id;
    }

    if (cart && cart.lineItems.length > 0) {
      cart.lineItems.forEach((item) => {
        const productBlock = createBlock(BlockType.div, ['basket__item']);
        const productName = createHeading(
          ['basket__item-name'],
          item.name['en-GB'],
          HeadingType.h2
        );
        const productPrice = createP(
          ['basket__item-price'],
          convertPrice(item.price.value.centAmount, item.price.value.fractionDigits)
        );
        productBlock.append(productName, productPrice);
        wrapper.append(productBlock);
      });
    } else {
      const emptyMessage = createP(['basket__empty-message'], 'The cart is empty.');
      wrapper.append(emptyMessage);
    }

    return wrapper;
  }
}
