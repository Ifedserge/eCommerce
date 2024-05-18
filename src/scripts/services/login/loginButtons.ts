import { NotificationType } from '../../components/types/enums';
import { displayErrorMessages } from '../utilities/error';
import { NotificationService } from '../utilities/notification';
import { validateEmail, validatePassword } from '../utilities/validation';
import { LoginService } from './loginService';

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

export function onSubmitLoginForm(event: Event) {
  event.preventDefault();
  const form: HTMLFormElement = event.target as HTMLFormElement;
  const email: string = form.querySelectorAll('input')[0].value;
  const password: string = form.querySelectorAll('input')[1].value;

  if (!email || !password) {
    NotificationService.showNotification('Please enter your email and password', NotificationType.error);
    return;
  }
  if (!validateEmail(email).isValid || !validatePassword(password).isValid) {
    NotificationService.showNotification('Please enter a valid email and password', NotificationType.error);
    return;
  }

  LoginService.login(email, password);
}
