import { Product } from '@commercetools/platform-sdk';
import { IProductData } from '../../components/types/interfaces';
import { Api } from '../api';

export async function getProductById(productId: string): Promise<IProductData> {
  const apiAnonRoot = Api.createAnonClient();
  const response = await apiAnonRoot.products().withId({ ID: productId }).get().execute();
  const product: Product = response.body;

  if (!product.masterData.current) {
    throw new Error('Product data is not available');
  }

  const currentData = product.masterData.current;

  const productData: IProductData = {
    id: product.id,
    masterVariant: {
      images: currentData.masterVariant.images || [],
      prices: (currentData.masterVariant.prices || []).map((price) => ({
        id: price.id,
        value: price.value,
        discounted: price.discounted,
      })),
    },
    name: {
      'en-GB': currentData.name['en-GB'] || '',
      ru: currentData.name.ru || '',
    },
    description: {
      'en-GB': currentData.description?.['en-GB'] || '',
      ru: currentData.description?.ru || '',
    },
    metaDescription: {
      'en-GB': currentData.metaDescription?.['en-GB'] || '',
      ru: currentData.metaDescription?.ru || '',
    },
    slug: {
      'en-GB': currentData.slug['en-GB'] || '',
      ru: currentData.slug.ru || '',
    },
  };

  return productData;
}
