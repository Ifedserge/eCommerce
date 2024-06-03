import { Category } from '@commercetools/platform-sdk';
import { NotificationType } from '../../components/types/enums';
import { IProductData } from '../../components/types/interfaces';
import { apiAnonRoot } from '../api';
import { NotificationService } from './notification';

export function getProducts(
  callBack: (data: IProductData) => HTMLElement,
  block: HTMLElement
): void | IProductData[] {
  apiAnonRoot
    .products()
    .get({
      queryArgs: {
        offset: 1,
        limit: 10,
      },
    })
    .execute()
    .then((response) => {
      response.body.results.forEach((item) => {
        const data = item.masterData.current as unknown as IProductData;
        block.append(callBack(data));
      });
    })
    .catch(() => {
      NotificationService.showNotification(
        'Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}

export function getCatalogueData(
  callBack: (data: IProductData) => HTMLElement,
  block: HTMLElement,
  id: string
): void | IProductData[] {
  apiAnonRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${id}"`, // 'categories.id:' + '"' + `${id}` + '"',
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
      NotificationService.showNotification(
        'Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}

export function getCategories(callback: (data: Category[]) => void): void {
  apiAnonRoot
    .categories()
    .get()
    .execute()
    .then((response) => callback(response.body.results))
    .catch(() => {
      NotificationService.showNotification(
        '!Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}
