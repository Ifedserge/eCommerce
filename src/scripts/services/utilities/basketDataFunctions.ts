import { Cart } from '@commercetools/platform-sdk';
import { Api } from '../api';
import { checkLoginState } from './checkLoginState';

export async function addGoodHandler(id: string, api: any): Promise<void> {
  let activeCart;
  let cart = JSON.parse(localStorage.getItem('cartData')!);
  if (!cart) {
    const carts = await getCarts(api);
    let targetCart;
    if (carts.length === 0) targetCart = await createCart(api);
    else if (carts.length > 1) targetCart = carts.find((item: Cart) => item.cartState === 'Active');
    else targetCart = carts[0];
    activeCart = { id: targetCart.id, version: targetCart.version };
    localStorage.setItem('cartData', JSON.stringify(activeCart));
  } else activeCart = cart;
  addGoodInBasket(activeCart.id, activeCart.version, id, api);
}

function addGoodInBasket(cartID: string, cartVersion: number, productID: string, api: any): void {
  let apiType;
  //const anonId = localStorage.getItem('anonymousId')!;
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
    .then((response: any) => {
      localStorage.setItem(
        'cartData',
        JSON.stringify({ id: response.body.id, version: response.body.version })
      );
    })
    .catch((response: any) => console.log(response));
}

async function createCart(api: any): Promise<Cart> {
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
    .then((response: any) => {
      cart = response.body;
      if (api) localStorage.setItem('anonymousId', response.body.anonymousId!);
    });
  return cart!;
}

async function getCarts(api: any): Promise<any> {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = api;
  let carts;
  await apiType
    .me()
    .carts()
    .get()
    .execute()
    .then((response: any) => (carts = response.body.results));
  return carts;
}
