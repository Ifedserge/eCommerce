import { IProductData } from '../../components/types/interfaces';
import { apiAnonRoot } from '../api';
import { createP } from './tags';

export function getCatalogueDataMan(
  callBack: (data: IProductData) => HTMLElement,
  block: HTMLElement
): void | IProductData[] {
  apiAnonRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: 'categories.id:"bea90c56-89ac-477a-9979-6ade2c7dada9"',
        limit: 10,
      },
    })
    .execute()
    .then((response) => {
      response.body.results.forEach((item) => {
        const data = item as unknown as IProductData;
        block.append(callBack(data));
      });
    })
    .catch(() => {
      const message = createP(
        ['error', 'text'],
        'Something happened. Please go to the main page...'
      );
      block.append(message);
    });
}
