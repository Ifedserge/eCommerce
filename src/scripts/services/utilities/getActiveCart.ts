import { Cart, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { Api } from '../api';
import { ICommercetoolsError } from '../../components/types/interfaces';
import { createNewCart } from './createNewCart';

export const getActiveCart = async (isUserLoggedIn: boolean): Promise<Cart | null> => {
  const storedCartId = localStorage.getItem('cartId');
  if (storedCartId) {
    try {
      const response: ClientResponse<Cart> = await Api.createAnonClient()
        .carts()
        .withId({ ID: storedCartId })
        .get()
        .execute();
      if (response.body.cartState === 'Active') {
        return response.body;
      }
    } catch (error) {
      const commercetoolsError = error as ICommercetoolsError;
      if (commercetoolsError.statusCode !== 404) {
        throw error;
      }
    }
  }

  try {
    if (isUserLoggedIn) {
      const response: ClientResponse<CartPagedQueryResponse> = await Api.createAuthClient()
        .me()
        .carts()
        .get()
        .execute();
      const activeCart = response.body.results.find((cart) => cart.cartState === 'Active');
      return activeCart || null;
    }
    if (!storedCartId) {
      return await createNewCart();
    }
    const response: ClientResponse<CartPagedQueryResponse> = await Api.createAnonClient()
      .carts()
      .get()
      .execute();
    const activeCart = response.body.results.find((cart) => cart.cartState === 'Active');
    return activeCart || null;
  } catch (error) {
    const commercetoolsError = error as ICommercetoolsError;
    if (commercetoolsError.errors && commercetoolsError.errors[0].code === 'ResourceNotFound') {
      return null;
    }
    throw error;
  }
};
