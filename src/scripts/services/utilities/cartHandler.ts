import { Cart, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { Api } from '../api';
import { handleAddToCart } from './handleAddToCart';
import { handleCreateCart } from './handleCreateCart';
import { ICommercetoolsError } from '../../components/types/interfaces';

const getActiveCart = async (isUserLoggedIn: boolean): Promise<Cart | null> => {
  const storedCartId = localStorage.getItem('cartId');
  if (storedCartId && !isUserLoggedIn) {
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

export const handleAddProductToCart = async (productId: string): Promise<void> => {
  const isUserLoggedIn = Boolean(localStorage.getItem('token'));
  let cart = await getActiveCart(isUserLoggedIn);

  if (!cart) {
    const newCartResponse = await handleCreateCart(isUserLoggedIn);
    cart = newCartResponse.body;

    if (!isUserLoggedIn) {
      localStorage.setItem('cartId', cart.id);
    }
  }

  const { id: cartId, version: cartVersion } = cart;

  await handleAddToCart(cartId, cartVersion, productId, isUserLoggedIn);

  cart = await getActiveCart(isUserLoggedIn);

  if (cart) {
    console.log('Cart ID:', cart.id);
    console.log('Current items in the cart:', cart.lineItems);
  }
};
