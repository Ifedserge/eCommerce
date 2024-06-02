import {
  CustomFieldsDraft,
  AnonymousCartSignInMode,
  Customer,
  Cart,
} from '@commercetools/platform-sdk';

export interface ITagAttributes {
  name: string;
  value?: string;
}
export interface IRouteInterface {
  path: string;
  callback: () => void;
}

export interface ICustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  addresses?: IAddress[];
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  custom?: CustomFieldsDraft;
  anonymousCartId?: string;
  anonymousCartSignInMode?: AnonymousCartSignInMode;
  anonymousId?: string;
  externalId?: string;
}

export interface IAddress {
  city: string;
  streetName: string;
  postalCode: string;
  country: string;
}

export interface ICustomerSignInResult {
  customer: Customer;
  cart?: Cart;
}

interface IPrice {
  id: string;
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface IProductData {
  masterVariant: {
    images: { url: string }[];
    prices: IPrice[];
  };
  name: {
    'en-GB': string;
    ru: string;
  };
  description: {
    'en-GB': string;
    ru: string;
  };
  metaDescription: {
    'en-GB': string;
    ru: string;
  };
  slug: {
    'en-GB': string;
    ru: string;
  };
}
