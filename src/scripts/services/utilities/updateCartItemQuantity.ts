import { Cart } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const updateCartItemQuantity = async (
  cartId: string,
  lineItemId: string,
  quantity: number,
  version: number
): Promise<Cart | null> => {
  try {
    const response = await Api.createAnonClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error: unknown) {
    return null;
  }
};
