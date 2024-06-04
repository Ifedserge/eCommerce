import {
  CustomerAddAddressAction,
  CustomerChangeAddressAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { NotificationType } from '../../components/types/enums';
import { IAddress, IUserProfile } from '../../components/types/interfaces';
import { apiAuthRoot } from '../api';
import { decryptCipher, encryptCipher } from '../utilities/encryptor';
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

  static async updateUser(user: IUserProfile, password: string): Promise<void> {
    const oldPassword: string = decryptCipher(localStorage.getItem('encryptedPassword') || '');

    await apiAuthRoot
      .me()
      .get()
      .execute()
      .then(({ body }) => {
        const currentUser = body;

        const actions: MyCustomerUpdateAction[] = [];

        if (currentUser.email !== user.email) {
          actions.push({
            action: 'changeEmail',
            email: user.email,
          });
        }

        if (currentUser.firstName !== user.firstName) {
          actions.push({
            action: 'setFirstName',
            firstName: user.firstName,
          });
        }

        if (currentUser.lastName !== user.lastName) {
          actions.push({
            action: 'setLastName',
            lastName: user.lastName,
          });
        }

        if (currentUser.dateOfBirth !== user.dateOfBirth) {
          actions.push({
            action: 'setDateOfBirth',
            dateOfBirth: user.dateOfBirth,
          });
        }

        apiAuthRoot
          .me()
          .post({
            body: {
              version: currentUser.version,
              actions,
            },
          })
          .execute()
          .then((response) => {
            if (oldPassword !== password) {
              apiAuthRoot
                .me()
                .password()
                .post({
                  body: {
                    version: response.body.version,
                    currentPassword: oldPassword,
                    newPassword: password,
                  },
                })
                .execute()
                .then(() => {
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('encryptedPassword', encryptCipher(password));
                  window.location.reload();
                  NotificationService.showNotification(
                    `Your data has been updated`,
                    NotificationType.success
                  );
                })
                .catch((error) => {
                  NotificationService.showNotification(
                    `Something went wrong. Please try again. Error: ${error.body.message}`,
                    NotificationType.error
                  );
                });
            } else {
              localStorage.setItem('user', JSON.stringify(user));
              window.location.reload();
              NotificationService.showNotification(
                `Your data has been updated`,
                NotificationType.success
              );
            }
          })
          .catch((error) => {
            NotificationService.showNotification(
              `Something went wrong. Please try again. Error: ${error.body.message}`,
              NotificationType.error
            );
          });
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error.body.message}`,
          NotificationType.error
        );
      });
  }

  static async updateAddresses(user: IUserProfile): Promise<void> {
    await apiAuthRoot
      .me()
      .get()
      .execute()
      .then(({ body }) => {
        const currentUser = body;

        const actions: MyCustomerUpdateAction[] = [];

        const existingAddresses = currentUser.addresses || [];
        const addressIdMap = new Map<string, string>();

        const handleAddressUpdate = (addresses: IAddress[]) => {
          addresses.forEach((address, index) => {
            const { id, ...addressWithoutId } = address;
            if (index < existingAddresses.length) {
              actions.push({
                action: 'changeAddress',
                addressId: existingAddresses[index].id,
                address: addressWithoutId,
              } as CustomerChangeAddressAction);
              addressIdMap.set(existingAddresses[index].id || '', address.id || '');
            } else {
              actions.push({
                action: 'addAddress',
                address: addressWithoutId,
              } as CustomerAddAddressAction);
            }
          });
        };

        handleAddressUpdate(user.billingAddresses);
        handleAddressUpdate(user.shippingAddresses);

        if (user.defaultBillingAddress) {
          const defaultBillingAddressId =
            addressIdMap.get(user.defaultBillingAddress.id || '') || user.defaultBillingAddress.id!;
          if (defaultBillingAddressId !== currentUser.defaultBillingAddressId) {
            actions.push({
              action: 'setDefaultBillingAddress',
              addressId: defaultBillingAddressId,
            } as CustomerSetDefaultBillingAddressAction);
          }
        }

        if (user.defaultShippingAddress) {
          const defaultShippingAddressId =
            addressIdMap.get(user.defaultShippingAddress.id || '') ||
            user.defaultShippingAddress.id!;
          if (defaultShippingAddressId !== currentUser.defaultShippingAddressId) {
            actions.push({
              action: 'setDefaultShippingAddress',
              addressId: defaultShippingAddressId,
            } as CustomerSetDefaultShippingAddressAction);
          }
        }

        const requestBody = {
          version: currentUser.version,
          actions,
        };

        apiAuthRoot
          .me()
          .post({
            body: requestBody,
          })
          .execute()
          .then(() => {
            localStorage.setItem('user', JSON.stringify(user));
          })
          .catch((error) => {
            NotificationService.showNotification(
              `Something went wrong. Please try again. Error: ${error.body.message}`,
              NotificationType.error
            );
          });
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error.body.message}`,
          NotificationType.error
        );
      });
  }
}
