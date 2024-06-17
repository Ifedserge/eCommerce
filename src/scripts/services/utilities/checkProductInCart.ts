import { LineItem } from '@commercetools/platform-sdk';
import { getActiveCart } from './getActiveCart';

export const checkProductInCart = async (productId: string): Promise<boolean> => {
  const isUserLoggedIn = Boolean(localStorage.getItem('token'));
  const cart = await getActiveCart(isUserLoggedIn);

  if (cart) {
    const productInCart = cart.lineItems.some((item: LineItem) => item.productId === productId);
    return productInCart;
  }
  return false;
};
