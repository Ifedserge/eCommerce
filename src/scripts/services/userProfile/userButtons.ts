import { NotificationType } from '../../components/types/enums';
import { IAddress, IUserProfile } from '../../components/types/interfaces';
import { NotificationService } from '../utilities/notification';
import {
  validateCity,
  validateDateOfBirth,
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validatePostalCode,
  validateStreet,
} from '../utilities/validation';
import { UserService } from './userService';

export function onEditModeButtonClick(event: Event) {
  const form = (event.target as HTMLElement).closest('form');

  if (form) {
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const buttons = form.querySelectorAll('button');

    inputs.forEach((input) => {
      input.disabled = false;
    });

    selects.forEach((select) => {
      select.disabled = false;
    });

    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

export function onInputRadioChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const form = target.closest('form');

  if (form) {
    const { name } = target;
    const radios: NodeListOf<HTMLInputElement> = form.querySelectorAll(`input[name="${name}"]`);

    radios.forEach((radio) => {
      if (radio !== target) {
        radio.checked = false;
      }
    });
  }
}

export function onDefaultShippingChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const radios = document.querySelectorAll(
    'input[name="defaultShipping"]'
  ) as NodeListOf<HTMLInputElement>;
  radios.forEach((radio) => {
    if (radio !== target) {
      radio.checked = false;
    }
  });
}

export function onDefaultBillingChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const radios = document.querySelectorAll(
    'input[name="defaultBilling"]'
  ) as NodeListOf<HTMLInputElement>;
  radios.forEach((radio) => {
    if (radio !== target) {
      radio.checked = false;
    }
  });
}

export function onSubmitUpdateUserButtonClick(event: Event) {
  event.preventDefault();
  const form = (event.target as HTMLElement).closest('form')!;

  const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value || '';

  const newUser: IUserProfile = {
    firstName: (form.querySelector('input[name="firstName"]') as HTMLInputElement).value || '',
    lastName: (form.querySelector('input[name="lastName"]') as HTMLInputElement).value || '',
    dateOfBirth: (form.querySelector('input[name="dateOfBirth"]') as HTMLInputElement).value || '',
    email: (form.querySelector('input[name="email"]') as HTMLInputElement).value || '',
    billingAddresses: [],
    shippingAddresses: [],
    defaultBillingAddress: null,
    defaultShippingAddress: null,
  };

  if (
    !password ||
    !newUser.email ||
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.dateOfBirth
  ) {
    NotificationService.showNotification('Please fill in all fields', NotificationType.error);
    return;
  }

  if (!validateEmail(newUser.email).isValid) {
    NotificationService.showNotification('Please enter a valid email', NotificationType.error);
    return;
  }
  if (!validatePassword(password).isValid) {
    NotificationService.showNotification('Please enter a valid password', NotificationType.error);
    return;
  }
  if (!validateName(newUser.firstName).isValid) {
    NotificationService.showNotification('Please enter a valid first name', NotificationType.error);
    return;
  }
  if (!validateLastName(newUser.lastName).isValid) {
    NotificationService.showNotification('Please enter a valid last name', NotificationType.error);
    return;
  }
  if (!validateDateOfBirth(newUser.dateOfBirth).isValid) {
    NotificationService.showNotification(
      'Please enter a valid date of birth',
      NotificationType.error
    );
    return;
  }

  UserService.updateUser(newUser, password);
}

export function onSubmitUpdateAddressButtonClick(event: Event) {
  event.preventDefault();
  const form = (event.target as HTMLElement).closest('form')!;

  const newUserAddress: IUserProfile = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    billingAddresses: [],
    shippingAddresses: [],
    defaultBillingAddress: null,
    defaultShippingAddress: null,
  };

  const addresses = form.querySelectorAll('.address-container');
  addresses.forEach((addressContainer) => {
    const address: IAddress = {
      id: addressContainer.getAttribute('data-id') || '',
      streetName:
        (addressContainer.querySelector('input[name="streetName"]') as HTMLInputElement).value ||
        '',
      streetNumber:
        (addressContainer.querySelector('input[name="streetNumber"]') as HTMLInputElement).value ||
        '',
      city: (addressContainer.querySelector('input[name="city"]') as HTMLInputElement).value || '',
      postalCode:
        (addressContainer.querySelector('input[name="postalCode"]') as HTMLInputElement).value ||
        '',
      country:
        (addressContainer.querySelector('select[name="country"]') as HTMLSelectElement).value || '',
    };

    if ((addressContainer.querySelector('input[name="billing"]') as HTMLInputElement).checked) {
      newUserAddress.billingAddresses.push(address);
    }
    if ((addressContainer.querySelector('input[name="shipping"]') as HTMLInputElement).checked) {
      newUserAddress.shippingAddresses.push(address);
    }
    if (
      (addressContainer.querySelector('input[name="defaultBilling"]') as HTMLInputElement).checked
    ) {
      newUserAddress.defaultBillingAddress = address;
    }
    if (
      (addressContainer.querySelector('input[name="defaultShipping"]') as HTMLInputElement).checked
    ) {
      newUserAddress.defaultShippingAddress = address;
    }

    if (
      !address.streetName ||
      !address.streetNumber ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      NotificationService.showNotification(
        'Please enter all required fields',
        NotificationType.error
      );
      return;
    }

    if (!validateCity(address.city).isValid) {
      NotificationService.showNotification('Please enter a valid city', NotificationType.error);
      return;
    }
    if (!validatePostalCode(address.country, address.postalCode).isValid) {
      NotificationService.showNotification(
        'Please enter a valid postal code',
        NotificationType.error
      );
      return;
    }
    if (!validateStreet(address.streetName).isValid) {
      NotificationService.showNotification(
        'Please enter a valid street name',
        NotificationType.error
      );
    }
  });

  UserService.updateAddresses(newUserAddress);
}
