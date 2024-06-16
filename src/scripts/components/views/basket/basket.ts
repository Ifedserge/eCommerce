import { Cart } from '@commercetools/platform-sdk';
import { createBlock, createP, createHeading } from '../../../services/utilities/tags';
import { BlockType, HeadingType } from '../../types/enums';
import { Api } from '../../../services/api';

const getActiveCart = async (): Promise<Cart | null> => {
  const cartId = localStorage.getItem('cartId');
  console.log('Retrieved cartId from localStorage:', cartId);
  if (!cartId) {
    return null;
  }

  try {
    const response = await Api.createAnonClient().carts().withId({ ID: cartId }).get().execute();
    console.log('Fetched cart from API:', response.body);
    if (response.body.cartState === 'Active') {
      return response.body;
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
  return null;
};

export class BasketPage {
  static async render(): Promise<HTMLElement> {
    const wrapper = createBlock(BlockType.div, ['basket']);
    const heading = createHeading(['basket__heading'], 'CART', HeadingType.h1);
    wrapper.append(heading);

    const cart = await getActiveCart();
    if (!cart) {
      const p = createP(['p'], 'Your basket is empty.');
      wrapper.append(p);
      return wrapper;
    }

    cart.lineItems.forEach((item) => {
      const itemBlock = createBlock(BlockType.div, ['basket__item']);
      const itemName = createP(['basket__item-name'], item.name['en-GB']);
      const itemQuantity = createP(['basket__item-quantity'], `Quantity: ${item.quantity}`);
      const itemPrice = createP(
        ['basket__item-price'],
        `Цена: ${item.price.value.centAmount / 100} ${item.price.value.currencyCode}`
      );
      itemBlock.append(itemName, itemQuantity, itemPrice);
      wrapper.append(itemBlock);
    });

    return wrapper;
  }
}
