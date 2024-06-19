import { Category } from '@commercetools/platform-sdk';
import { NotificationType, SortType, SortingValue } from '../../components/types/enums';
import { IProductAllData, IProductData } from '../../components/types/interfaces';
import { NotificationService } from './notification';
import { Api } from '../api';

const apiAnonRoot = Api.createAnonClient();

export function getProducts(
  callBack: (data: IProductAllData) => HTMLElement,
  block: HTMLElement
): void | IProductAllData[] {
  apiAnonRoot
    .products()
    .get({
      queryArgs: {
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
  id: string,
  totalCardUpdateCallback: (num: number, offset: number | undefined) => void,
  offset?: number
): void | IProductData[] {
  apiAnonRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${id}"`,
        limit: 10,
        offset,
      },
    })
    .execute()
    .then((response) => {
      response.body.results.forEach((item) => {
        const data = item as unknown as IProductData;
        block.append(callBack(data));
      });
      if (response.body.total) totalCardUpdateCallback(response.body.total, offset);
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

export function sortCards(
  value: SortingValue,
  id: string,
  sortingType: SortType,
  callBack: (data: IProductData | IProductAllData) => HTMLElement,
  block: HTMLElement
): void | IProductData[] | IProductAllData[] {
  const queryArgs = {
    filter:
      id === 'none' || id === ''
        ? `categories.id:"1309b310-7a8e-4651-b120-91b5f3e84e08"`
        : `categories.id:"${id}"`,
    sort: `${value} ${sortingType}`,
    limit: 10,
  };

  apiAnonRoot
    .productProjections()
    .search()
    .get({ queryArgs })
    .execute()
    .then((response) => {
      response.body.results.forEach((item) => {
        const data = item as unknown as IProductData | IProductAllData;
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
