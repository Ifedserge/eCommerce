import {
  createBlock,
  createButton,
  createForm,
  createInput,
  createLabel,
  createSelect,
} from '../../../services/utilities/tags';
import { BlockType, InputType } from '../../types/enums';

import {
  onInputEmailChange,
  onInputNameChange,
  onInputLastNameChange,
  onInputPasswordChange,
  onInputDateOfBirthChange,
  onInputCityChange,
  onInputStreetChange,
  onInputPostalCodeChange,
  onSubmitRegistrationForm,
} from '../../../services/registration/registrationButtons';

class Registration {
  static render(): HTMLFormElement {
    const registrationForm = createForm(['registration-form']);
    registrationForm.addEventListener('submit', onSubmitRegistrationForm);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('auth-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('text');
    legend.textContent = 'Registration';

    const emailContainer = createBlock(BlockType.div, ['form-group']);
    const emailLabel = createLabel(['form-label', 'text'], 'Email');
    const emailInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter email',
    });
    emailInput.setAttribute('name', 'email');
    emailInput.addEventListener('input', onInputEmailChange);

    emailContainer.appendChild(emailLabel);
    emailContainer.appendChild(emailInput);

    const nameContainer = createBlock(BlockType.div, ['form-group']);
    const nameLabel = createLabel(['form-label', 'text'], 'Name');
    const nameInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter your name',
    });
    nameInput.setAttribute('name', 'name');
    nameInput.addEventListener('input', onInputNameChange);

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    const lastNameContainer = createBlock(BlockType.div, ['form-group']);
    const lastNameLabel = createLabel(['form-label', 'text'], 'Last name');
    const lastNameInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter your last name',
    });
    lastNameInput.setAttribute('name', 'lastname');
    lastNameInput.addEventListener('input', onInputLastNameChange);

    lastNameContainer.appendChild(lastNameLabel);
    lastNameContainer.appendChild(lastNameInput);

    const passwordContainer = createBlock(BlockType.div, ['form-group']);
    const passwordLabel = createLabel(['form-label', 'text'], 'Password');
    const passwordInput = createInput(InputType.password, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter password',
    });
    passwordInput.setAttribute('name', 'password');
    passwordInput.addEventListener('input', onInputPasswordChange);

    passwordContainer.appendChild(passwordLabel);
    passwordContainer.appendChild(passwordInput);

    const dateOfBirthContainer = createBlock(BlockType.div, ['form-group']);
    const dateOfBirthLabel = createLabel(['form-label', 'text'], 'Date of birth');
    const dateOfBirthInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter date of birth',
    });
    dateOfBirthInput.setAttribute('name', 'dateOfBirth');
    dateOfBirthInput.addEventListener('input', onInputDateOfBirthChange);

    dateOfBirthContainer.appendChild(dateOfBirthLabel);
    dateOfBirthContainer.appendChild(dateOfBirthInput);

    const countryContainer = createBlock(BlockType.div, ['form-group']);
    const countryLabel = createLabel(['form-label', 'text'], 'Country');
    const countrySelect = createSelect(['Belarus', 'Germany'], ['form-control', 'text']);
    countrySelect.setAttribute('name', 'country');

    countryContainer.appendChild(countryLabel);
    countryContainer.appendChild(countrySelect);

    const cityContainer = createBlock(BlockType.div, ['form-group']);
    const cityLabel = createLabel(['form-label', 'text'], 'City');
    const cityInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter city',
    });
    cityInput.setAttribute('name', 'city');
    cityInput.addEventListener('input', onInputCityChange);

    cityContainer.appendChild(cityLabel);
    cityContainer.appendChild(cityInput);

    const streetContainer = createBlock(BlockType.div, ['form-group']);
    const streetLabel = createLabel(['form-label', 'text'], 'Street');
    const streetInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter street',
    });
    streetInput.setAttribute('name', 'street');
    streetInput.addEventListener('input', onInputStreetChange);

    streetContainer.appendChild(streetLabel);
    streetContainer.appendChild(streetInput);

    const streetNumberContainer = createBlock(BlockType.div, ['form-group']);
    const streetNumberLabel = createLabel(['form-label'], 'Street number');
    const streetNumberInput = createInput(InputType.text, ['form-control'], { name: 'placeholder', value: 'Enter street number' });
    streetNumberInput.setAttribute('name', 'streetNumber');
    streetNumberInput.addEventListener('input', onInputStreetChange);

    streetNumberContainer.appendChild(streetNumberLabel);
    streetNumberContainer.appendChild(streetNumberInput);

    const countryIndexContainer = createBlock(BlockType.div, ['form-group']);
    const countryIndexLabel = createLabel(['form-label', 'text'], 'Country index');
    const countryIndexInput = createInput(InputType.text, ['form-control', 'text'], {
      name: 'placeholder',
      value: 'Enter country index',
    });
    countryIndexInput.setAttribute('name', 'countryIndex');
    countryIndexInput.addEventListener('input', onInputPostalCodeChange);

    countryIndexContainer.appendChild(countryIndexLabel);
    countryIndexContainer.appendChild(countryIndexInput);

    const defaultAddressContainer = createBlock(BlockType.div, ['form-group']);
    const defaultAddressLabel = createLabel(['form-label'], 'Set as default shipping address');
    const defaultAddressInput = createInput(InputType.checkbox, ['default_check']);
    defaultAddressInput.setAttribute('name', 'defaultAddress');

    defaultAddressContainer.append(defaultAddressLabel, defaultAddressInput);

    fieldset.append(
      legend,
      emailContainer,
      nameContainer,
      lastNameContainer,
      passwordContainer,
      dateOfBirthContainer,
      countryContainer,
      cityContainer,
      streetContainer,
      streetNumberContainer,
      countryIndexContainer,
      defaultAddressContainer,
    );

    const submitButton = createButton(
      ['registration-form__button', 'text', 'text_bold'],
      'Register',
    );
    const loginButton = createButton(
      ['registration-form__button', 'text', 'text_bold'],
      'To come in',
    );
    loginButton.addEventListener('click', () => {
      window.location.pathname = '/login';
    });
    registrationForm.appendChild(fieldset);
    registrationForm.append(submitButton, loginButton);

    return registrationForm;
  }
}

export default Registration;
