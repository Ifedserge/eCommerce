import { Category } from '@commercetools/platform-sdk';
import { NotificationType } from '../../components/types/enums';
import { IProductAllData, IProductData } from '../../components/types/interfaces';
import { NotificationService } from './notification';
import { Api } from '../api';

export function getProducts(
  callBack: (data: IProductAllData) => HTMLElement,
  block: HTMLElement
): void | IProductAllData[] {
  const apiAnonRoot = Api.createAnonClient();
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
        const data = item as unknown as IProductAllData;
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
  const apiAnonRoot = Api.createAnonClient();
  apiAnonRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${id}"`,
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
  const apiAnonRoot = Api.createAnonClient();
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
