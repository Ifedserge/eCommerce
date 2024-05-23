import {
  onInputEmailChange,
  onInputPasswordChange,
  onSubmitLoginForm,
} from '../../../services/login/loginButtons';
import {
  createBlock,
  createButton,
  createForm,
  createInput,
  createLabel,
} from '../../../services/utilities/tags';
import { BlockType, InputType } from '../../types/enums';

export class Login {
  static render(): HTMLFormElement {
    this.render.toString();
    const loginForm = createForm(['login-form']);
    loginForm.addEventListener('submit', onSubmitLoginForm);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('auth-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('text');
    legend.textContent = 'Login';

    const emailContainer = createBlock(BlockType.div, ['form-group']);

    const emailLabel = createLabel(['form-label', 'text', 'text-normal'], 'Email');
    const emailInput = createInput(InputType.text, ['form-control', 'text', 'text_small']);
    emailInput.setAttribute('placeholder', 'Enter email');
    emailInput.addEventListener('keypress', onInputEmailChange);

    emailContainer.appendChild(emailLabel);
    emailContainer.appendChild(emailInput);

    const passwordContainer = createBlock(BlockType.div, ['form-group']);

    const passwordLabel = createLabel(['form-label', 'text', 'text-normal'], 'Password');
    const passwordInput = createInput(InputType.password, ['form-control', 'text', 'text_small'], {
      name: 'placeholder',
      value: 'Enter password',
    });
    passwordInput.addEventListener('keyup', onInputPasswordChange);

    const eye = document.createElement('i');
    eye.textContent = '👁️‍🗨️';
    eye.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    });

    passwordContainer.appendChild(passwordLabel);
    passwordContainer.appendChild(passwordInput);
    passwordContainer.appendChild(eye);

    fieldset.appendChild(legend);
    fieldset.appendChild(emailContainer);
    fieldset.appendChild(passwordContainer);

    const submitButton = createButton(['login-form__button', 'text', 'text_bold'], 'Login');

    loginForm.appendChild(fieldset);
    loginForm.appendChild(submitButton);

    return loginForm;
  }
}
