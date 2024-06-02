import { NotificationType } from '../../components/types/enums';
import { IUserProfile } from '../../components/types/interfaces';
import { apiAuthRoot } from '../api';
import { NotificationService } from '../utilities/notification';

export class UserService {
  static getCurrentUser(): IUserProfile {
    let user: IUserProfile = {
      email: '',
      firstName: '',
      lastName: '',
      billingAddresses: [],
      shippingAddresses: [],
      defaultBillingAddress: null,
      defaultShippingAddress: null,
      dateOfBirth: '',
    };

    apiAuthRoot
      .me()
      .get()
      .execute()
      .then((response) => {
        const addresses = (response.body.addresses || []).map((address) => ({
          id: address.id,
          city: address.city || '',
          streetName: address.streetName || '',
          streetNumber: address.streetNumber || '',
          postalCode: address.postalCode || '',
          country: address.country || '',
        }));

        const billingAddresses = addresses.filter((address) =>
          (response.body.billingAddressIds || []).includes(address.id || '')
        );
        const shippingAddresses = addresses.filter((address) =>
          (response.body.shippingAddressIds || []).includes(address.id || '')
        );
        const defaultBillingAddress =
          billingAddresses.find(
            (address) => address.id === response.body.defaultBillingAddressId
          ) || null;
        const defaultShippingAddress =
          shippingAddresses.find(
            (address) => address.id === response.body.defaultShippingAddressId
          ) || null;

        user = {
          email: response.body.email,
          firstName: response.body.firstName || '',
          lastName: response.body.lastName || '',
          billingAddresses,
          shippingAddresses,
          defaultBillingAddress,
          defaultShippingAddress,
          dateOfBirth: response.body.dateOfBirth || '',
        };

        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error.body.message}`,
          NotificationType.error
        );
      });

    return user;
  }
}
