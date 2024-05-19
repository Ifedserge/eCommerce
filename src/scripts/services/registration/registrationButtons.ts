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
  const country: string = (document.querySelector('select[name="country"]') as HTMLSelectElement).value;

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
  const cityInput = form.querySelector('input[name="city"]') as HTMLInputElement;
  const streetInput = form.querySelector('input[name="street"]') as HTMLInputElement;
  const postalCodeInput = form.querySelector('input[name="countryIndex"]') as HTMLInputElement;
  const countrySelect = form.querySelector('select[name="country"]') as HTMLSelectElement;

  const email = emailInput?.value || '';
  const password = passwordInput?.value || '';
  const name = nameInput?.value || '';
  const lastName = lastNameInput?.value || '';
  const dateOfBirth = dateOfBirthInput?.value || '';
  const city = cityInput?.value || '';
  const street = streetInput?.value || '';
  const postalCode = postalCodeInput?.value || '';
  const country = countrySelect?.value || '';

  if (!email
    || !password
    || !name
    || !lastName
    || !dateOfBirth
    || !city
    || !street
    || !postalCode
  ) {
    NotificationService.showNotification('Please fill out all fields', NotificationType.error);
    return;
  }

  if (!validateEmail(email).isValid) {
    NotificationService.showNotification('Please enter a valid email', NotificationType.error);
    return;
  }
  if (!validatePassword(password).isValid) {
    NotificationService.showNotification('Please enter a valid password', NotificationType.error);
    return;
  }
  if (!validateName(name).isValid) {
    NotificationService.showNotification('Please enter a valid name', NotificationType.error);
    return;
  }
  if (!validateLastName(lastName).isValid) {
    NotificationService.showNotification('Please enter a valid last name', NotificationType.error);
    return;
  }
  if (!validateDateOfBirth(dateOfBirth).isValid) {
    NotificationService.showNotification('Please enter a valid date of birth', NotificationType.error);
    return;
  }
  if (!validateCity(city).isValid) {
    NotificationService.showNotification('Please enter a valid city', NotificationType.error);
    return;
  }
  if (!validateStreet(street).isValid) {
    NotificationService.showNotification('Please enter a valid street', NotificationType.error);
    return;
  }
  if (!validatePostalCode(country, postalCode).isValid) {
    NotificationService.showNotification('Please enter a valid postal code', NotificationType.error);
    return;
  }

  RegistrationService.register(
    email,
    password,
    name,
    lastName,
    dateOfBirth,
    city,
    street,
    postalCode,
    country,
  );
}
