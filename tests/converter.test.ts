import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { convertToUserProfile } from '../src/scripts/services/utilities/converter';
import { IUserProfile } from '../src/scripts/components/types/interfaces';

describe('convertToUserProfile', () => {
  const mockCustomerResponse = (body: Partial<Customer>): ClientResponse<Customer> => ({
    body: body as Customer,
  });

  test('returns default profile for empty user body', () => {
    const emptyUserResponse = mockCustomerResponse({});
    const userProfile = convertToUserProfile(emptyUserResponse);

    const expectedProfile: IUserProfile = {
      email: '',
      firstName: '',
      lastName: '',
      billingAddresses: [],
      shippingAddresses: [],
      defaultBillingAddress: null,
      defaultShippingAddress: null,
      dateOfBirth: '',
    };

    expect(userProfile).toEqual(expectedProfile);
  });

  test('converts user profile correctly', () => {
    const customerResponse = mockCustomerResponse({
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        {
          id: 'address1',
          city: 'City1',
          streetName: 'Street1',
          streetNumber: '1',
          postalCode: '12345',
          country: 'Country1',
        },
        {
          id: 'address2',
          city: 'City2',
          streetName: 'Street2',
          streetNumber: '2',
          postalCode: '67890',
          country: 'Country2',
        },
      ],
      billingAddressIds: ['address1'],
      shippingAddressIds: ['address2'],
      defaultBillingAddressId: 'address1',
      defaultShippingAddressId: 'address2',
      dateOfBirth: '1990-01-01',
    });

    const userProfile = convertToUserProfile(customerResponse);

    const expectedProfile: IUserProfile = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      billingAddresses: [
        {
          id: 'address1',
          city: 'City1',
          streetName: 'Street1',
          streetNumber: '1',
          postalCode: '12345',
          country: 'Country1',
        },
      ],
      shippingAddresses: [
        {
          id: 'address2',
          city: 'City2',
          streetName: 'Street2',
          streetNumber: '2',
          postalCode: '67890',
          country: 'Country2',
        },
      ],
      defaultBillingAddress: {
        id: 'address1',
        city: 'City1',
        streetName: 'Street1',
        streetNumber: '1',
        postalCode: '12345',
        country: 'Country1',
      },
      defaultShippingAddress: {
        id: 'address2',
        city: 'City2',
        streetName: 'Street2',
        streetNumber: '2',
        postalCode: '67890',
        country: 'Country2',
      },
      dateOfBirth: '1990-01-01',
    };

    expect(userProfile).toEqual(expectedProfile);
  });

  test('handles missing optional fields gracefully', () => {
    const customerResponse = mockCustomerResponse({
      email: 'jane.doe@example.com',
    });

    const userProfile = convertToUserProfile(customerResponse);

    const expectedProfile: IUserProfile = {
      email: 'jane.doe@example.com',
      firstName: '',
      lastName: '',
      billingAddresses: [],
      shippingAddresses: [],
      defaultBillingAddress: null,
      defaultShippingAddress: null,
      dateOfBirth: '',
    };

    expect(userProfile).toEqual(expectedProfile);
  });
});
