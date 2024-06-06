import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { IUserProfile } from '../../components/types/interfaces';

export function convertToUserProfile(user: ClientResponse<Customer>): IUserProfile {
  if (!user.body) {
    return {
      email: '',
      firstName: '',
      lastName: '',
      billingAddresses: [],
      shippingAddresses: [],
      defaultBillingAddress: null,
      defaultShippingAddress: null,
      dateOfBirth: '',
    };
  }

  const addresses = (user.body.addresses || []).map((address) => ({
    id: address.id,
    city: address.city || '',
    streetName: address.streetName || '',
    streetNumber: address.streetNumber || '',
    postalCode: address.postalCode || '',
    country: address.country || '',
  }));

  const billingAddresses = addresses.filter((address) =>
    (user.body.billingAddressIds || []).includes(address.id || '')
  );
  const shippingAddresses = addresses.filter((address) =>
    (user.body.shippingAddressIds || []).includes(address.id || '')
  );
  const defaultBillingAddress =
    billingAddresses.find((address) => address.id === user.body.defaultBillingAddressId) || null;
  const defaultShippingAddress =
    shippingAddresses.find((address) => address.id === user.body.defaultShippingAddressId) || null;

  const userProfile: IUserProfile = {
    email: user.body.email,
    firstName: user.body.firstName || '',
    lastName: user.body.lastName || '',
    billingAddresses,
    shippingAddresses,
    defaultBillingAddress,
    defaultShippingAddress,
    dateOfBirth: user.body.dateOfBirth || '',
  };

  return userProfile;
}
