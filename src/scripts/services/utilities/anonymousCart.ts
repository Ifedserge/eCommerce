import { apiAnonRoot } from '../api';
import { IProductData } from '../../components/types/interfaces';

export async function createAnonymousCart(): Promise<string> {
  const response = await apiAnonRoot
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
  return response.body.id;
}

export async function addToAnonymousCart(cartId: string, product: IProductData): Promise<void> {
  await apiAnonRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: 1,
        actions: [
          {
            action: 'addLineItem',
            productId: product.id,
            sku: product.masterVariant.sku,
          },
        ],
      },
    })
    .execute();
}
