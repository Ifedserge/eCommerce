import { Api } from '../api';
import { checkCart, checkLoginState } from './checkLoginState';

export function addGoodHandler(): void {
  if (checkCart()) addGoodInBasket();
  else createCart();
}

function addGoodInBasket(): void {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = Api.createAnonClient();

  debugger;
  apiType
    .me()
    .carts()
    .withId({ ID: localStorage.getItem('cartId')! })
    .post({
      body: {
        version: 1,
        actions: [
          {
            action: 'addLineItem',
            productId: '1f980c5b-918c-4db8-91ad-4acbf4b05733',
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      console.log(response);
    });
}

function createCart(): void {
  let apiType;
  if (checkLoginState()) apiType = Api.createAuthClient();
  else apiType = Api.createAnonClient();
  apiType
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute()
    .then((response) => {
      console.log(response);
      //скорее всего нужно будет создавать объект с данными Cart, потому что на сколько я понял надо хранить еще версию корзины
      localStorage.setItem('cartId', response.body.id); //здесь получаю id Cart
      //addGoodInBasket();
      checkCartInApi(); //но при попытке обратиться к корзине выдает ошибку 404. Я похоже как-то не так к ней обращаюсь
    });
}

function checkCartInApi(): void {
  let apiType;
  apiType = Api.createAnonClient();
  apiType
    .me()
    .carts()
    .withId({ ID: localStorage.getItem('cartId')! })
    .head()
    .execute()
    .then((response) => {
      console.log(response);
    });
}
