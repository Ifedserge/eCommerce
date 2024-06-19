import {
  Category,
  ClientResponse,
  ProductPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { NotificationType, SortType, SortingValue } from '../../components/types/enums';
import { IProductAllData, IProductData } from '../../components/types/interfaces';
import { NotificationService } from './notification';
import { Api } from '../api';
import { Card } from '../../components/views/partials/card/card';
import { getActiveCart } from './getActiveCart';

async function renderCategoryCards(
  response: ClientResponse<ProductProjectionPagedSearchResponse>,
  block: HTMLElement
): Promise<void> {
  if (!localStorage.getItem('cartId')) {
    response.body.results.forEach((item) => {
      const data = item as unknown as IProductData;
      block.append(new Card(data).createCard());
    });
  } else {
    const isUserLoggedIn = Boolean(localStorage.getItem('token'));
    const cart = await getActiveCart(isUserLoggedIn);
    response.body.results.forEach((item) => {
      const data = item as unknown as IProductData;
      const card = new Card(data);
      if (cart?.lineItems.find((lineItem) => lineItem.productId === data.id))
        card.disableCartButton();
      block.append(card.createCard());
    });
  }
}

async function renderProductCards(
  response: ClientResponse<ProductPagedQueryResponse>,
  block: HTMLElement
): Promise<void> {
  if (!localStorage.getItem('cartId')) {
    response.body.results.forEach((item) => {
      const data = item as unknown as IProductAllData;
      block.append(new Card(data).createCard());
    });
  } else {
    const isUserLoggedIn = Boolean(localStorage.getItem('token'));
    const cart = await getActiveCart(isUserLoggedIn);
    response.body.results.forEach((item) => {
      const data = item as unknown as IProductAllData;
      const card = new Card(data);
      if (cart?.lineItems.find((lineItem) => lineItem.productId === data.id))
        card.disableCartButton();
      block.append(card.createCard());
    });
  }
}

const apiAnonRoot = Api.createAnonClient();

export function getProducts(block: HTMLElement): void | IProductAllData[] {
  apiAnonRoot
    .products()
    .get({
      queryArgs: {
        limit: 10,
      },
    })
    .execute()
    .then((response) => renderProductCards(response, block))
    .catch(() => {
      NotificationService.showNotification(
        'Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}

export async function getCatalogueData(
  block: HTMLElement,
  id: string,
  totalCardUpdateCallback: (num: number, offset: number | undefined) => void,
  offset?: number
): Promise<void | IProductData[]> {
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
    .then((response) =>
      (async function checkChosenCards() {
        await renderCategoryCards(response, block);
        if (response.body.total) totalCardUpdateCallback(response.body.total, offset);
      })()
    )
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
    .then((response) => renderCategoryCards(response, block))
    .catch(() => {
      NotificationService.showNotification(
        'Something happened. Please, go to the main page...',
        NotificationType.error
      );
    });
}
