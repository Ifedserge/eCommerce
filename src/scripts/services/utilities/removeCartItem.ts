import { Cart } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const removeCartItem = async (
  cartId: string,
  lineItemId: string,
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
              action: 'removeLineItem',
              lineItemId,
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
