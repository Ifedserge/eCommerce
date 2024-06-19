import {
  Address,
  CustomerAddAddressAction,
  CustomerChangeAddressAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { NotificationType } from '../../components/types/enums';
import { IUserProfile } from '../../components/types/interfaces';
import { decryptCipher, encryptCipher } from '../utilities/encryptor';
import { NotificationService } from '../utilities/notification';
import { Api } from '../api';
import { convertToUserProfile } from '../utilities/converter';

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

    const apiAuthRoot = Api.createAuthClient();

    apiAuthRoot
      .me()
      .get()
      .execute()
      .then((response) => {
        user = convertToUserProfile(response);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
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

    const apiAuthRoot = Api.createAuthClient();

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
                  localStorage.setItem('encryptedPassword', encryptCipher(password));
                  this.getCurrentUser();
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
              this.getCurrentUser();
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
    const apiAuthRoot = Api.createAuthClient();
    await apiAuthRoot
      .me()
      .get()
      .execute()
      .then(({ body }) => {
        const currentUser = body;

        const actions: MyCustomerUpdateAction[] = [];
        const actions2: MyCustomerUpdateAction[] = [];
        const existingAddresses = currentUser.addresses || [];
        const addressIdMap = new Map<string, string>();

        user.billingAddresses.forEach((address, index) => {
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

        user.shippingAddresses.forEach((address, index) => {
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

        if (user.defaultBillingAddress) {
          const defaultBillingAddressId =
            addressIdMap.get(user.defaultBillingAddress.id || '') || user.defaultBillingAddress.id!;
          if (defaultBillingAddressId !== currentUser.defaultBillingAddressId) {
            actions2.push({
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
            actions2.push({
              action: 'setDefaultShippingAddress',
              addressId: defaultShippingAddressId,
            } as CustomerSetDefaultShippingAddressAction);
          }
        }

        const currentShippingAddressIds = currentUser.shippingAddressIds || [];
        const currentBillingAddressIds = currentUser.billingAddressIds || [];

        const newShippingAddressIds = user.shippingAddresses.map(
          (address) => addressIdMap.get(address.id || '') || address.id!
        );

        const newBillingAddressIds = user.billingAddresses.map(
          (address) => addressIdMap.get(address.id || '') || address.id!
        );

        const removedShippingAddressIds = currentShippingAddressIds.filter(
          (id) => !newShippingAddressIds.includes(id)
        );

        const removedBillingAddressIds = currentBillingAddressIds.filter(
          (id) => !newBillingAddressIds.includes(id)
        );

        removedShippingAddressIds.forEach((id) => {
          actions2.push({
            action: 'removeShippingAddressId',
            addressId: id,
          } as MyCustomerRemoveShippingAddressIdAction);
        });

        removedBillingAddressIds.forEach((id) => {
          actions2.push({
            action: 'removeBillingAddressId',
            addressId: id,
          } as MyCustomerRemoveBillingAddressIdAction);
        });

        newShippingAddressIds.forEach((id) => {
          if (!currentShippingAddressIds.includes(id)) {
            actions2.push({
              action: 'addShippingAddressId',
              addressId: id,
            } as MyCustomerAddShippingAddressIdAction);
          }
        });

        newBillingAddressIds.forEach((id) => {
          if (!currentBillingAddressIds.includes(id)) {
            actions2.push({
              action: 'addBillingAddressId',
              addressId: id,
            } as MyCustomerAddBillingAddressIdAction);
          }
        });

        const uniqueActions = actions.reduce(
          (acc: MyCustomerUpdateAction[], action: MyCustomerUpdateAction) => {
            const isDuplicate = acc.some(
              (existingAction) => JSON.stringify(existingAction) === JSON.stringify(action)
            );
            if (!isDuplicate) {
              acc.push(action);
            }
            return acc;
          },
          []
        );

        const uniqueActions2 = actions2.reduce(
          (acc: MyCustomerUpdateAction[], action: MyCustomerUpdateAction) => {
            const isDuplicate = acc.some(
              (existingAction) => JSON.stringify(existingAction) === JSON.stringify(action)
            );
            if (!isDuplicate) {
              acc.push(action);
            }
            return acc;
          },
          []
        );

        const requestBody = {
          version: currentUser.version,
          actions: uniqueActions,
        };

        apiAuthRoot
          .me()
          .post({
            body: requestBody,
          })
          .execute()
          .then((response) => {
            const updatedUser = response.body;

            updatedUser.addresses.forEach((address: Address) => {
              if (!addressIdMap.has(address.id!)) {
                const originalAddress =
                  user.billingAddresses.find((addr) => addr.id === '') ||
                  user.shippingAddresses.find((addr) => addr.id === '');
                if (originalAddress) {
                  addressIdMap.set(originalAddress.id || '', address.id!);
                }
              }
            });

            const requestBody2 = {
              version: updatedUser.version,
              actions: uniqueActions2.map((action) => {
                if (
                  action.action === 'addShippingAddressId' ||
                  action.action === 'addBillingAddressId' ||
                  action.action === 'removeShippingAddressId' ||
                  action.action === 'removeBillingAddressId' ||
                  action.action === 'setDefaultShippingAddress' ||
                  action.action === 'setDefaultBillingAddress'
                ) {
                  return {
                    ...action,
                    addressId: addressIdMap.get(action.addressId || '') || action.addressId,
                  };
                }
                return action;
              }),
            };

            apiAuthRoot
              .me()
              .post({
                body: requestBody2,
              })
              .execute()
              .then(() => {
                this.getCurrentUser();
                NotificationService.showNotification(
                  'Addresses updated successfully',
                  NotificationType.success
                );
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
      })
      .catch((error) => {
        NotificationService.showNotification(
          `Something went wrong. Please try again. Error: ${error.body.message}`,
          NotificationType.error
        );
      });
  }

  static removeAddress(addressId: string) {
    const apiAuthRoot = Api.createAuthClient();

    apiAuthRoot
      .me()
      .get()
      .execute()
      .then((response) => {
        const currentUser = response.body;

        const actions: MyCustomerUpdateAction[] = [
          {
            action: 'removeAddress',
            addressId,
          },
        ];

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
            this.getCurrentUser();
            NotificationService.showNotification(
              'Address removed successfully',
              NotificationType.success
            );
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
