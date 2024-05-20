import {
  CustomFieldsDraft,
  AnonymousCartSignInMode,
  Customer,
  Cart,
} from '@commercetools/platform-sdk';

export interface TagAttributes {
  name: string;
  value?: string;
}
export interface RouteInterface {
  path: string;
  callback: () => void;
}

export interface Router {
  navigate: (url: string) => void;
}

export interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  addresses?: Address[];
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  custom?: CustomFieldsDraft;
  anonymousCartId?: string;
  anonymousCartSignInMode?: AnonymousCartSignInMode;
  anonymousId?: string;
  externalId?: string;
}

export interface Address {
  city: string;
  streetName: string;
  postalCode: string;
  country: string;
}

export interface CustomerSignInResult {
  customer: Customer;
  cart?: Cart;
}
