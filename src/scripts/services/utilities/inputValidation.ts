import {
  validateEmail,
  validateName,
  validateLastName,
  validatePassword,
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
