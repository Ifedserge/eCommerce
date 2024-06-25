import { CartUpdate, CartUpdateAction } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const handleAddToCart = async (
  cartId: string,
  cartVersion: number,
  productId: string,
  isUserLoggedIn: boolean
) => {
  const actions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      variantId: 1,
      quantity: 1,
    },
  ];

  const cartUpdate: CartUpdate = {
    version: cartVersion,
    actions,
  };

  if (isUserLoggedIn) {
    return Api.createAuthClient()
      .carts()
      .withId({ ID: cartId })
      .post({ body: cartUpdate })
      .execute();
  }

  return Api.createAnonClient().carts().withId({ ID: cartId }).post({ body: cartUpdate }).execute();
};
