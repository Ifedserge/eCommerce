import { getActiveCart } from './getActiveCart';
import { handleAddToCart } from './handleAddToCart';
import { createNewCart } from './createNewCart';

export const handleAddProductToCart = async (productId: string): Promise<void> => {
  const isUserLoggedIn = Boolean(localStorage.getItem('token'));
  let cart = await getActiveCart(isUserLoggedIn);

  if (!cart) {
    cart = await createNewCart();
  }

  if (!cart) {
    return;
  }
  const { id: cartId, version: cartVersion } = cart;

  await handleAddToCart(cartId, cartVersion, productId, isUserLoggedIn);

  cart = await getActiveCart(isUserLoggedIn);
};
