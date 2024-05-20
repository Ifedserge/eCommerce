import {
  validateEmail,
  validateName,
  validateLastName,
  validatePassword,
  validateDateOfBirth,
  validateCity,
  validateStreet,
  validatePostalCode,
} from './validation';

export function validateEmailInput(
  emailInput: HTMLInputElement,
  emailErrorElement: HTMLElement,
): void {
  const emailValue = emailInput.value;
  const { isValid, errorMessages } = validateEmail(emailValue);
  const emailError = emailErrorElement;

  if (isValid) {
    emailInput.classList.remove('error');
    emailError.classList.remove('visible');
    setTimeout(() => { emailError.textContent = ''; }, 500);
  } else {
    emailInput.classList.add('error');
    emailError.classList.add('fade-out');
    setTimeout(() => {
      emailError.textContent = errorMessages.join(', ');
      emailError.classList.remove('fade-out');
      emailError.classList.add('visible');
    }, 500);
  }
}

export function validateNameInput(
  nameInput: HTMLInputElement,
  nameErrorElement: HTMLElement,
): void {
  const nameValue = nameInput.value;
  const { isValid, errorMessages } = validateName(nameValue);
  const nameError = nameErrorElement;

  if (isValid) {
    nameInput.classList.remove('error');
    nameError.classList.remove('visible');
    setTimeout(() => { nameError.textContent = ''; }, 500);
  } else {
    nameInput.classList.add('error');
    nameError.classList.add('fade-out');
    setTimeout(() => {
      nameError.textContent = errorMessages.join(', ');
      nameError.classList.remove('fade-out');
      nameError.classList.add('visible');
    }, 500);
  }
}
export function validateLastNameInput(
  lastnameInput: HTMLInputElement,
  nameErrorElement: HTMLElement,
): void {
  const nameValue = lastnameInput.value;
  const { isValid, errorMessages } = validateLastName(nameValue);
  const nameError = nameErrorElement;

  if (isValid) {
    lastnameInput.classList.remove('error');
    nameError.classList.remove('visible');
    setTimeout(() => { nameError.textContent = ''; }, 500);
  } else {
    lastnameInput.classList.add('error');
    nameError.classList.add('fade-out');
    setTimeout(() => {
      nameError.textContent = errorMessages.join(', ');
      nameError.classList.remove('fade-out');
      nameError.classList.add('visible');
    }, 500);
  }
}

export function validatePasswordInput(
  passwordInput: HTMLInputElement,
  passwordErrorElement: HTMLElement,
): void {
  const passwordValue = passwordInput.value;
  const { isValid, errorMessages } = validatePassword(passwordValue);
  const passwordError = passwordErrorElement;

  if (isValid) {
    passwordInput.classList.remove('error');
    passwordError.classList.remove('visible');
    setTimeout(() => { passwordError.textContent = ''; }, 500);
  } else {
    passwordInput.classList.add('error');
    passwordError.classList.add('fade-out');
    setTimeout(() => {
      passwordError.textContent = errorMessages.join(', ');
      passwordError.classList.remove('fade-out');
      passwordError.classList.add('visible');
    }, 500);
  }
}

export function validateDateOfBirthInput(
  dateOfBirthInput: HTMLInputElement,
  dateOfBirthErrorElement: HTMLElement,
): void {
  const dateOfBirthValue = dateOfBirthInput.value;
  const { isValid, errorMessages } = validateDateOfBirth(dateOfBirthValue);
  const dateOfBirthError = dateOfBirthErrorElement;

  if (isValid) {
    dateOfBirthInput.classList.remove('error');
    dateOfBirthError.classList.remove('visible');
    setTimeout(() => { dateOfBirthError.textContent = ''; }, 500);
  } else {
    dateOfBirthInput.classList.add('error');
    dateOfBirthError.classList.add('fade-out');
    setTimeout(() => {
      dateOfBirthError.textContent = errorMessages.join(', ');
      dateOfBirthError.classList.remove('fade-out');
      dateOfBirthError.classList.add('visible');
    }, 500);
  }
}

export function validateStreetInput(
  streetInput: HTMLInputElement,
  streetErrorElement: HTMLElement,
): void {
  const streetInputValue = streetInput.value;
  const { isValid, errorMessages } = validateStreet(streetInputValue);
  const streetError = streetErrorElement;

  if (isValid) {
    streetInput.classList.remove('error');
    streetError.classList.remove('visible');
    setTimeout(() => { streetError.textContent = ''; }, 500);
  } else {
    streetInput.classList.add('error');
    streetError.classList.add('fade-out');
    setTimeout(() => {
      streetError.textContent = errorMessages.join(', ');
      streetError.classList.remove('fade-out');
      streetError.classList.add('visible');
    }, 500);
  }
}

export function validateCityInput(
  cityInput: HTMLInputElement,
  cityErrorElement: HTMLElement,
): void {
  const cityValue = cityInput.value;
  const { isValid, errorMessages } = validateCity(cityValue);
  const cityError = cityErrorElement;

  if (isValid) {
    cityInput.classList.remove('error');
    cityError.classList.remove('visible');
    setTimeout(() => { cityError.textContent = ''; }, 500);
  } else {
    cityInput.classList.add('error');
    cityError.classList.add('fade-out');
    setTimeout(() => {
      cityError.textContent = errorMessages.join(', ');
      cityError.classList.remove('fade-out');
      cityError.classList.add('visible');
    }, 500);
  }
}

export function validatePostalCodeInput(
  countrySelect: HTMLSelectElement,
  postalCodeInput: HTMLInputElement,
  postalCodeErrorElement: HTMLElement,
): void {
  const countryValue = countrySelect.value;
  const postalCodeValue = postalCodeInput.value;
  const { isValid, errorMessages } = validatePostalCode(countryValue, postalCodeValue);
  const postalCodeError = postalCodeErrorElement;

  if (isValid) {
    postalCodeInput.classList.remove('error');
    postalCodeError.classList.remove('visible');
    setTimeout(() => { postalCodeError.textContent = ''; }, 500);
  } else {
    postalCodeInput.classList.add('error');
    postalCodeError.classList.add('fade-out');
    setTimeout(() => {
      postalCodeError.textContent = errorMessages.join(', ');
      postalCodeError.classList.remove('fade-out');
      postalCodeError.classList.add('visible');
    }, 500);
  }
}
