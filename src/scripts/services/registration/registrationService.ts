import { CustomerDraft, CustomerAddAddressAction } from '@commercetools/platform-sdk';
import { apiAnonRoot } from '../api';
import { NotificationService } from '../utilities/notification';
import { NotificationType } from '../../components/types/enums';

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
    city: string,
    street: string,
    streetNumber: string,
    postalCode: string,
    country: string
  ): Promise<void> {
    const countryCode = countryCodes[country];
    if (!countryCode) {
      return Promise.reject(new Error(`Invalid country name: ${country}`));
    }

    const customerDraft: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
    };

    return apiAnonRoot
      .customers()
      .post({ body: customerDraft })
      .execute()
      .then((response) => {
        const customerId = response.body.customer.id;
        const customerVersion = response.body.customer.version;

        const addressAction: CustomerAddAddressAction = {
          action: 'addAddress',
          address: {
            city,
            streetName: street,
            streetNumber,
            postalCode,
            country: countryCode,
          },
        };

        const updateBody = {
          version: customerVersion,
          actions: [addressAction],
        };

        return apiAnonRoot
          .customers()
          .withId({ ID: customerId })
          .post({ body: updateBody })
          .execute();
      })
      .then(() => {
        NotificationService.showNotification(
          'Registration and address addition successful!',
          NotificationType.success
        );
        window.location.pathname = '/index';
      })
      .catch((error) => {
        const errorMessage = error?.body?.message || `An unknown error occurred: ${error.message}`;
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${errorMessage}`,
          NotificationType.error
        );
      });
  }
}
