import { CartDraft } from '@commercetools/platform-sdk';
import { Api } from '../api';

export const handleCreateCart = async (isUserLoggedIn: boolean) => {
  const cartDraft: CartDraft = {
    currency: 'USD',
  };

  if (isUserLoggedIn) {
    return Api.createAuthClient().carts().post({ body: cartDraft }).execute();
  }

  return Api.createAnonClient().carts().post({ body: cartDraft }).execute();
};
