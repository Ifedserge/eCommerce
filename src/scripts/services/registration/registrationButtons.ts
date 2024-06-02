import { displayErrorMessages } from '../utilities/error';
import {
  validateEmail,
  validateName,
  validateLastName,
  validatePassword,
  validateDateOfBirth,
  validateCity,
  validateStreet,
  validatePostalCode,
} from '../utilities/validation';
import { NotificationService } from '../utilities/notification';
import { NotificationType } from '../../components/types/enums';
import { RegistrationService } from './registrationService';

export function onInputEmailChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const email: string = input.value;

  const validationResult = validateEmail(email);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputNameChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const name: string = input.value;

  const validationResult = validateName(name);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputLastNameChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const lastName: string = input.value;

  const validationResult = validateLastName(lastName);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputPasswordChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const password: string = input.value;

  const validationResult = validatePassword(password);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputDateOfBirthChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const dateOfBirth: string = input.value;

  const validationResult = validateDateOfBirth(dateOfBirth);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputCityChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const city: string = input.value;

  const validationResult = validateCity(city);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputStreetChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const street: string = input.value;

  const validationResult = validateStreet(street);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputPostalCodeChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const postalCode: string = input.value;
  const country: string = (document.querySelector('select[name="country"]') as HTMLSelectElement)
    .value;

  const validationResult = validatePostalCode(country, postalCode);
  if (!validationResult.isValid) {
    displayErrorMessages(validationResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onSubmitRegistrationForm(event: Event) {
  event.preventDefault();
  const form: HTMLFormElement = event.target as HTMLFormElement;

  const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
  const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
  const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
  const lastNameInput = form.querySelector('input[name="lastname"]') as HTMLInputElement;
  const dateOfBirthInput = form.querySelector('input[name="dateOfBirth"]') as HTMLInputElement;
  const shippingCityInput = form.querySelector('input[name="city"]') as HTMLInputElement;
  const shippingStreetInput = form.querySelector('input[name="street"]') as HTMLInputElement;
  const shippingStreetNumberInput = form.querySelector(
    'input[name="streetNumber"]'
  ) as HTMLInputElement;
  const shippingPostalCodeInput = form.querySelector(
    'input[name="countryIndex"]'
  ) as HTMLInputElement;
  const shippingCountrySelect = form.querySelector('select[name="country"]') as HTMLSelectElement;
  const billingCityInput = form.querySelector('input[name="billingCity"]') as HTMLInputElement;
  const billingStreetInput = form.querySelector('input[name="billingStreet"]') as HTMLInputElement;
  const billingStreetNumberInput = form.querySelector(
    'input[name="billingStreetNumber"]'
  ) as HTMLInputElement;
  const billingPostalCodeInput = form.querySelector(
    'input[name="billingCountryIndex"]'
  ) as HTMLInputElement;
  const billingCountrySelect = form.querySelector(
    'select[name="billingCountry"]'
  ) as HTMLSelectElement;
  const useAsDefaultBillingInput = form.querySelector(
    'input[name="useAsDefaultBilling"]'
  ) as HTMLInputElement;
  const useAsDefaultShippingInput = form.querySelector(
    'input[name="defaultAddress"]'
  ) as HTMLInputElement;

  const email = emailInput?.value || '';
  const password = passwordInput?.value || '';
  const firstName = nameInput?.value || '';
  const lastName = lastNameInput?.value || '';
  const dateOfBirth = dateOfBirthInput?.value || '';
  const shippingCity = shippingCityInput?.value || '';
  const shippingStreet = shippingStreetInput?.value || '';
  const shippingStreetNumber = shippingStreetNumberInput?.value || '';
  const shippingPostalCode = shippingPostalCodeInput?.value || '';
  const shippingCountry = shippingCountrySelect?.value || '';
  const billingCity = billingCityInput?.value || '';
  const billingStreet = billingStreetInput?.value || '';
  const billingStreetNumber = billingStreetNumberInput?.value || '';
  const billingPostalCode = billingPostalCodeInput?.value || '';
  const billingCountry = billingCountrySelect?.value || '';
  const useAsDefaultBilling = useAsDefaultBillingInput?.checked || false;
  const useAsDefaultShipping = useAsDefaultShippingInput?.checked || false;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !shippingCity ||
    !shippingStreet ||
    !shippingStreetNumber ||
    !shippingPostalCode ||
    !shippingCountry ||
    !billingCity ||
    !billingStreet ||
    !billingStreetNumber ||
    !billingPostalCode ||
    !billingCountry
  ) {
    NotificationService.showNotification('Please fill out all fields', NotificationType.error);
    return;
  }

  RegistrationService.register(
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    shippingCity,
    shippingStreet,
    shippingStreetNumber,
    shippingPostalCode,
    shippingCountry,
    billingCity,
    billingStreet,
    billingStreetNumber,
    billingPostalCode,
    billingCountry,
    useAsDefaultBilling,
    useAsDefaultShipping
  )
    .then(() => {
      NotificationService.showNotification('Registration successful!', NotificationType.success);
    })
    .catch((error) => {
      NotificationService.showNotification(
        `Registration failed: ${error.message}`,
        NotificationType.error
      );
    });
}
