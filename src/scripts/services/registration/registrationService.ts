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

    const address: BaseAddress = {
      country: countryCode,
      firstName,
      lastName,
      streetName: street,
      streetNumber,
      postalCode,
      city,
      email,
    };

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [address],
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

        // console.log('apiAnonRoot ne ok:\n' + response);
        console.log(anonResponse);

        console.log(localStorage.getItem('email'));
        console.log(localStorage.getItem('encryptPassword'));

        return apiAuthRoot
          .me()
          .get()
          .execute()
          .then((authResponse) => {
            // console.log('apiAuthRoot ok:\n' + response);
            console.log(authResponse);
          })
          .catch((authError) => {
            const errorMessage =
              authError?.body?.message || `An unknown error occurred: ${authError.message}`;
            NotificationService.showNotification(
              `Something went wrong. Please try again. Error: ${errorMessage}`,
              NotificationType.error
            );
            const abc = {
              queryArgs: {
                version: anonResponse.body.customer.version,
                key: `${process.env.CTP_PROJECT_KEY}`,
              },
            };
            apiAuthRoot.me().delete(abc).execute();
            console.log(`apiAuthRoot ne ok: + ${authError}`);
          });

        // window.location.pathname = '/index';
      })
      .catch((anonError) => {
        const errorMessage =
          anonError?.body?.message || `An unknown error occurred: ${anonError.message}`;
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${errorMessage}`,
          NotificationType.error
        );
        console.log(`apiAnonRoot ne ok: + ${anonError}`);
      });

    // return apiAnonRoot
    //   .customers()
    //   .post({ body: customerDraft })
    //   .execute()
    //   .then((response) => {
    //     const customerId = response.body.customer.id;
    //     const customerVersion = response.body.customer.version;

    //     const addressAction: CustomerAddAddressAction = {
    //       action: 'addAddress',
    //       address: {
    //         city,
    //         streetName: street,
    //         streetNumber,
    //         postalCode,
    //         country: countryCode,
    //       },
    //     };

    //     const updateBody = {
    //       version: customerVersion,
    //       actions: [addressAction],
    //     };

    //     return apiAnonRoot.customers().withId({ ID: customerId }).post({ body: updateBody }).execute();
    //   })
    //   .then(() => {
    //     NotificationService.showNotification(
    //       'Registration and address addition successful!',
    //       NotificationType.success
    //     );
    //     window.location.pathname = '/index';
    //   })
    //   .catch((error) => {
    //     const errorMessage = error?.body?.message || `An unknown error occurred: ${error.message}`;
    //     NotificationService.showNotification(
    //       `Something went wrong. Please try again. Error: ${errorMessage}`,
    //       NotificationType.error
    //     );
    //   });
  }
}
