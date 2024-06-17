import { Cart, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { Api } from '../api';
import { ICommercetoolsError } from '../../components/types/interfaces';
import { createNewCart } from './createNewCart';

export const getActiveCart = async (isUserLoggedIn: boolean): Promise<Cart | null> => {
  const storedCartId = localStorage.getItem('cartId');

  if (storedCartId) {
    return Api.createAnonClient()
      .carts()
      .withId({ ID: storedCartId })
      .get()
      .execute()
      .then((response: ClientResponse<Cart>) => {
        if (response.body.cartState === 'Active') {
          return response.body;
        }
        return null;
      })
      .catch((error) => {
        const commercetoolsError = error as ICommercetoolsError;
        if (commercetoolsError.statusCode !== 404) {
          throw error;
        } else {
          return null;
        }
      });
  }

  if (isUserLoggedIn) {
    return Api.createAuthClient()
      .me()
      .carts()
      .get()
      .execute()
      .then((response: ClientResponse<CartPagedQueryResponse>) => {
        const activeCart = response.body.results.find((cart) => cart.cartState === 'Active');
        return activeCart || null;
      })
      .catch((error) => {
        const commercetoolsError = error as ICommercetoolsError;
        if (commercetoolsError.errors && commercetoolsError.errors[0].code === 'ResourceNotFound') {
          return null;
        }
        throw error;
      });
  }

  if (!storedCartId) {
    return createNewCart();
  }

  return Api.createAnonClient()
    .carts()
    .get()
    .execute()
    .then((response: ClientResponse<CartPagedQueryResponse>) => {
      const activeCart = response.body.results.find((cart) => cart.cartState === 'Active');
      return activeCart || null;
    })
    .catch((error) => {
      const commercetoolsError = error as ICommercetoolsError;
      if (commercetoolsError.errors && commercetoolsError.errors[0].code === 'ResourceNotFound') {
        return null;
      }
      throw error;
    });
};
