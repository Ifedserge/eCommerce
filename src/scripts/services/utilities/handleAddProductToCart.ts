import { getActiveCart } from './getActiveCart';
import { handleAddToCart } from './handleAddToCart';
import { handleRemoveProductFromCart } from './handleRemoveProductFromCart';
import { createNewCart } from './createNewCart';

export const handleAddProductToCart = async (
  productId: string,
  callingFromCard?: boolean
): Promise<void> => {
  const isUserLoggedIn = Boolean(localStorage.getItem('token'));
  let cart = await getActiveCart(isUserLoggedIn);

  if (!cart) {
    cart = await createNewCart();
  }

  if (!cart) {
    return;
  }

  const productInCart = cart.lineItems.some((item) => item.productId === productId);

  if (productInCart) {
    if (callingFromCard) {
      Promise.resolve();
      return;
    }
    await handleRemoveProductFromCart(productId);
  } else {
    const { id: cartId, version: cartVersion } = cart;
    await handleAddToCart(cartId, cartVersion, productId, isUserLoggedIn);
  }
};
