import { Cart } from '@commercetools/platform-sdk';
import { createBlock, createP, createHeading, createImg } from '../../../services/utilities/tags';
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
    const heading = createHeading(['basket__heading'], 'Cart', HeadingType.h1);
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

    let totalPrice = 0;

    if (cart && cart.lineItems.length > 0) {
      cart.lineItems.forEach((item) => {
        const productBlock = createBlock(BlockType.div, ['basket__item']);

        if (item.variant && item.variant.images && item.variant.images.length > 0) {
          const productImg = createImg(
            ['basket__item-img'],
            item.variant.images[0].url,
            item.name['en-GB']
          );
          productBlock.appendChild(productImg);
        }

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

        totalPrice += item.price.value.centAmount;
      });

      const formattedTotalPrice = convertPrice(
        totalPrice,
        cart.lineItems[0].price.value.fractionDigits
      );
      const totalPriceBlock = createBlock(BlockType.div, ['basket__total']);
      const totalPriceText = createP(['basket__total-text'], `Total Price: ${formattedTotalPrice}`);
      totalPriceBlock.append(totalPriceText);
      wrapper.append(totalPriceBlock);
    } else {
      const emptyMessage = createP(['basket__empty-message'], 'The cart is empty.');
      wrapper.append(emptyMessage);
    }

    return wrapper;
  }
}
