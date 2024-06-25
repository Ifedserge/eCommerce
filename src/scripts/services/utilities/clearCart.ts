import { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const clearCart = async (
  cartId: string,
  version: number,
  lineItems: Cart['lineItems']
): Promise<Cart | null> => {
  try {
    const actions: CartUpdateAction[] = lineItems.map((item) => ({
      action: 'removeLineItem',
      lineItemId: item.id,
    }));

    const response = await Api.createAnonClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();

    return response.body;
  } catch (error: unknown) {
    return null;
  }
};
