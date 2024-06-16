import { ByProjectKeyRequestBuilder, Cart } from '@commercetools/platform-sdk';
import { Api } from '../api';
import { checkLoginState } from './checkLoginState';

function addGoodInBasket(
  cartID: string,
  cartVersion: number,
  productID: string,
  api: ByProjectKeyRequestBuilder
): void {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = api;
  apiType
    .me()
    .carts()
    .withId({ ID: cartID })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId: productID,
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      localStorage.setItem(
        'cartData',
        JSON.stringify({ id: response.body.id, version: response.body.version })
      );
    });
}

async function createCart(api: ByProjectKeyRequestBuilder): Promise<Cart> {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = api;
  let cart;
  await apiType
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute()
    .then((response) => {
      cart = response.body;
      if (api) localStorage.setItem('anonymousId', response.body.anonymousId!);
    });
  return cart!;
}

async function getCarts(api: ByProjectKeyRequestBuilder): Promise<Cart[]> {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = api;
  let carts;
  await apiType
    .me()
    .carts()
    .get()
    .execute()
    .then((response) => {
      carts = response.body.results;
    });
  return carts!;
}

export async function addGoodHandler(id: string, api: ByProjectKeyRequestBuilder): Promise<void> {
  let activeCart;
  const cart = JSON.parse(localStorage.getItem('cartData')!);
  if (!cart) {
    const carts = await getCarts(api);
    let targetCart: Cart;
    if (carts.length === 0) targetCart = await createCart(api);
    else if (carts.length > 1) {
      const cartForLint = carts.find((item) => item.cartState === 'Active');
      if (cartForLint) targetCart = cartForLint;
    } else targetCart = carts[0];
    activeCart = { id: targetCart!.id, version: targetCart!.version };
    localStorage.setItem('cartData', JSON.stringify(activeCart));
  } else activeCart = cart;
  addGoodInBasket(activeCart.id, activeCart.version, id, api);
}
