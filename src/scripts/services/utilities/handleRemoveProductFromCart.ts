import { Api } from '../api';
import { getActiveCart } from './getActiveCart';

export const handleRemoveProductFromCart = async (productId: string): Promise<void> => {
  const isUserLoggedIn = Boolean(localStorage.getItem('token'));
  const cart = await getActiveCart(isUserLoggedIn);

  if (!cart) {
    return;
  }

  const { id: cartId, version: cartVersion } = cart;
  const lineItem = cart.lineItems.find((item) => item.productId === productId);

  if (!lineItem) {
    return;
  }

  await Api.createAnonClient()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineItem.id,
          },
        ],
      },
    })
    .execute();
};
