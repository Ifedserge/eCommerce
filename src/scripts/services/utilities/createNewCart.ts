import { Cart } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const createNewCart = async (): Promise<Cart> => {
  const response = await Api.createAnonClient()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
  const newCart = response.body;
  localStorage.setItem('cartId', newCart.id);
  return newCart;
};
