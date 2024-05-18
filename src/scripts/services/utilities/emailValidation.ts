import { validateEmail } from './validation';

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
