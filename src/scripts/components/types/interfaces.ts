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
  callback: (params?: { [key: string]: string }) => void;
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
  id?: string;
  city: string;
  streetName: string;
  streetNumber?: string;
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
  discounted?: {
    value: {
      centAmount: number;
      fractionDigits: number;
    };
  };
}

export interface IPathResource {
  path: string;
  resource: string;
}

export interface IProductData {
  id: string;
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

export interface IProductAllData {
  id: string;
  masterData: {
    current: {
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
      masterVariant: {
        images: { url: string }[];
        prices: IPrice[];
      };
      slug: {
        'en-GB': string;
        ru: string;
      };
    };
  };
}


export interface IUserProfile {
  email: string;
  firstName: string;
  lastName: string;
  billingAddresses: IAddress[];
  shippingAddresses: IAddress[];
  defaultBillingAddress: IAddress | null;
  defaultShippingAddress: IAddress | null;
  dateOfBirth: string;
}

export interface ICategoryData {
  name: {
    'en-GB': string;
    ru: string;
  };
  id: string;
  parent?: {
    id: string;
  };
  slug: {
    'en-GB': string;
    ru: string;
  };
}

export interface ICategory {
  name: string;
  id: string;
  slug: string;
  parent?: string;
}
