import {
  MyCustomerDraft,
  BaseAddress,
  CustomerUpdateAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerAddBillingAddressIdAction,
} from '@commercetools/platform-sdk';
import { NotificationService } from '../utilities/notification';
import { NotificationType } from '../../components/types/enums';
import { encryptCipher } from '../utilities/encryptor';
import { Api } from '../api';
import { convertToUserProfile } from '../utilities/converter';

const countryCodes: { [key: string]: string } = {
  Belarus: 'BY',
  Germany: 'DE',
};

export class RegistrationService {
  static register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    shippingCity: string,
    shippingStreet: string,
    shippingStreetNumber: string,
    shippingPostalCode: string,
    shippingCountry: string,
    billingCity: string,
    billingStreet: string,
    billingStreetNumber: string,
    billingPostalCode: string,
    billingCountry: string,
    useAsDefaultBilling: boolean,
    useAsDefaultShipping: boolean
  ): Promise<void> {
    const shippingCountryCode = countryCodes[shippingCountry];
    const billingCountryCode = countryCodes[billingCountry];
    if (!shippingCountryCode || !billingCountryCode) {
      return Promise.reject(
        new Error(`Invalid country name: ${shippingCountry}, ${billingCountry}`)
      );
    }

    const shippingAddress: BaseAddress = {
      country: shippingCountryCode,
      firstName,
      lastName,
      streetName: shippingStreet,
      streetNumber: shippingStreetNumber,
      postalCode: shippingPostalCode,
      city: shippingCity,
      email,
    };

    const billingAddress: BaseAddress = {
      country: billingCountryCode,
      firstName,
      lastName,
      streetName: billingStreet,
      streetNumber: billingStreetNumber,
      postalCode: billingPostalCode,
      city: billingCity,
      email,
    };

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: useAsDefaultShipping ? 0 : undefined,
      defaultBillingAddress: useAsDefaultBilling ? 1 : undefined,
    };

    const apiAnonRoot = Api.createAnonClient();

    return apiAnonRoot
      .me()
      .signup()
      .post({ body: customerDraft })
      .execute()
      .then((anonResponse) => {
        localStorage.setItem('email', email);
        localStorage.setItem('encryptPassword', encryptCipher(password));
        NotificationService.showNotification(
          'Registration and address addition successful!',
          NotificationType.success
        );

        const { id: customerId, version, addresses } = anonResponse.body.customer;

        const actions: CustomerUpdateAction[] = [];
        if (useAsDefaultShipping) {
          actions.push({
            action: 'setDefaultShippingAddress',
            addressId: addresses[0].id,
          } as CustomerSetDefaultShippingAddressAction);
        } else {
          actions.push({
            action: 'addShippingAddressId',
            addressId: addresses[0].id,
          } as CustomerAddShippingAddressIdAction);
        }

        if (useAsDefaultBilling) {
          actions.push({
            action: 'setDefaultBillingAddress',
            addressId: addresses[1].id,
          } as CustomerSetDefaultBillingAddressAction);
        } else {
          actions.push({
            action: 'addBillingAddressId',
            addressId: addresses[1].id,
          } as CustomerAddBillingAddressIdAction);
        }

        const apiAuthRoot = Api.createAuthClient();

        return apiAuthRoot
          .customers()
          .withId({ ID: customerId })
          .post({
            body: {
              version,
              actions,
            },
          })
          .execute()
          .then((response) => {
            const user = convertToUserProfile(response);
            localStorage.setItem('user', JSON.stringify(user));
            NotificationService.showNotification(
              'Addresses added successfully!',
              NotificationType.success
            );
            window.location.pathname = '/index';
          });
      })
      .catch((anonError) => {
        const errorMessage =
          anonError?.body?.message || `An unknown error occurred: ${anonError.message}`;
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${errorMessage}`,
          NotificationType.error
        );
      });
  }
}
