import { MyCustomerDraft, BaseAddress } from '@commercetools/platform-sdk';
import { apiAnonRoot, apiAuthRoot } from '../api';
import { NotificationService } from '../utilities/notification';
import { NotificationType } from '../../components/types/enums';
import { encryptCipher } from '../utilities/encryptor';

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

        return apiAuthRoot
          .me()
          .get()
          .execute()
          .then((authResponse) => {
            console.log(`'apiAuthRoot response:\n' + ${authResponse}`);
            window.location.pathname = '/index';
          })
          .catch((authError) => {
            const errorMessage =
              authError?.body?.message || `An unknown error occurred: ${authError.message}`;
            NotificationService.showNotification(
              `Something went wrong. Please try again. Error: ${errorMessage}`,
              NotificationType.error
            );
            const deleteArgs = {
              queryArgs: {
                version: anonResponse.body.customer.version,
                key: `${process.env.CTP_PROJECT_KEY}`,
              },
            };
            apiAuthRoot.me().delete(deleteArgs).execute();
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
