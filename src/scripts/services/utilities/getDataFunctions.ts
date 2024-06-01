import { NotificationType } from '../../components/types/enums';
import { IProductData } from '../../components/types/interfaces';
import { apiAnonRoot } from '../api';
import { NotificationService } from './notification';

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
      NotificationService.showNotification(
        'Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}
