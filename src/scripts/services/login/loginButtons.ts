import { displayErrorMessages } from '../utilities/error';
import { validateEmail, validatePassword } from '../utilities/validation';

export function onInputEmailChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const email: string = input.value;

  const validitionResult = validateEmail(email);
  if (!validitionResult.isValid) {
    displayErrorMessages(validitionResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}

export function onInputPasswordChange(event: Event) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const password: string = input.value;

  const validitionResult = validatePassword(password);
  if (!validitionResult.isValid) {
    displayErrorMessages(validitionResult.errorMessages, input.parentNode as HTMLElement);
    return;
  }

  displayErrorMessages([], input.parentNode as HTMLElement);
}
