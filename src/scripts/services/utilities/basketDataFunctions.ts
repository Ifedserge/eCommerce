import { Api } from '../api';
import { checkCart, checkLoginState } from './checkLoginState';

export async function addGoodHandler(id: string): Promise<void> {
  if (!checkCart()) await getCart();
  const cartData = JSON.parse(localStorage.getItem('cartData')!);
  addGoodInBasket(cartData.id, cartData.version, id);
}

function addGoodInBasket(cartID: string, cartVersion: number, productID: string): void {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = Api.createAnonClient();
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
      console.log(response);
    });
}

async function createCart(): Promise<void> {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = Api.createAnonClient();
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
      localStorage.setItem('cartData', JSON.stringify({ id: response.body.id, version: 1 }));
    });
}

async function getCart(): Promise<void> {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = Api.createAnonClient();
  await apiType
    .me()
    .carts()
    .get()
    .execute()
    .then((response) => {
      console.log(response);
      if (response.body.results.length === 0) createCart();
      else {
        const actualCart = response.body.results.find((item) => item.cartState === 'Active');
        const cartData = { id: actualCart!.id, version: actualCart!.version };
        localStorage.setItem('cartData', JSON.stringify(cartData));
      }
    });
}
