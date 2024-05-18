import {
  createBlock, createButton, createForm, createInput, createLabel,
} from '../../../services/utilities/tags';
import { BlockType, InputType } from '../../types/enums';
import {
  validateEmailInput,
  validateNameInput,
  validateLastNameInput,
  validatePasswordInput,
  validateDateOfBirthInput,
  validateStreetInput,
  validateCityInput,
  validatePostalCodeInput,
} from '../../../services/utilities/inputValidation';

class Registartion {
  regestrationSection: HTMLElement;

  regestrationContainer: HTMLElement;

  fieldset: HTMLElement;

  legend: HTMLElement;

  usernameContainer: HTMLElement;

  usernameLabel: HTMLElement;

  usernameInput: HTMLInputElement;

  userLastnameContainer: HTMLElement;

  userLastnameLabel: HTMLElement;

  userLastnameInput: HTMLInputElement;

  emailContainer: HTMLElement;

  emailLabel: HTMLElement;

  emailInput: HTMLInputElement;

  passwordContainer: HTMLElement;

  passwordLabel: HTMLElement;

  passwordInput: HTMLInputElement;

  dateOfBirth: HTMLElement;

  dateOfBirthLabel:HTMLElement;

  dateOfBirthInput:HTMLInputElement;

  country: HTMLElement;

  countryLabel: HTMLElement;

  countrySelect: HTMLSelectElement;

  city: HTMLElement;

  cityLabel: HTMLElement;

  cityInput: HTMLInputElement;

  street: HTMLElement;

  streetLabel: HTMLElement;

  streetInput: HTMLInputElement;

  countryIndex: HTMLElement;

  countryIndexLabel: HTMLElement;

  countryIndexInput: HTMLInputElement;

  regBtn: HTMLElement;

  constructor() {
    this.regestrationSection = createBlock(BlockType.section, ['registration']);
    this.regestrationContainer = createForm(['regestration__container']);
    this.fieldset = document.createElement('fieldset');
    this.fieldset.classList.add('auth-fieldset');

    this.legend = document.createElement('legend');
    this.legend.textContent = 'Registration';

    this.usernameContainer = createBlock(BlockType.div, ['username__block']);
    this.usernameLabel = createLabel(['form-label'], 'Name');
    this.usernameInput = createInput(InputType.text, ['form-control']);
    this.usernameInput.setAttribute('placeholder', 'Enter your name');

    this.userLastnameContainer = createBlock(BlockType.div, ['user_last_name__block']);
    this.userLastnameLabel = createLabel(['form-label'], 'Last name');
    this.userLastnameInput = createInput(InputType.text, ['form-control']);
    this.userLastnameInput.setAttribute('placeholder', 'Enter your last name');

    this.emailContainer = createBlock(BlockType.div, ['email__block']);
    this.emailLabel = createLabel(['form-label'], 'Email');
    this.emailInput = createInput(InputType.text, ['form-control']);
    this.emailInput.setAttribute('placeholder', 'Enter email');

    this.passwordContainer = createBlock(BlockType.div, ['password__block']);
    this.passwordLabel = createLabel(['form-label'], 'Password');
    this.passwordInput = createInput(InputType.password, ['form-control'], { name: 'placeholder', value: 'Enter password' });

    this.dateOfBirth = createBlock(BlockType.div, ['date_of_birth__block']);
    this.dateOfBirthLabel = createLabel(['form-label'], 'Date of birth');
    this.dateOfBirthInput = createInput(InputType.text, ['form-control']);
    this.dateOfBirthInput.setAttribute('placeholder', 'Enter date of birth');

    this.country = createBlock(BlockType.div, ['country__block']);
    this.countryLabel = createLabel(['form-label'], 'Country');
    this.countrySelect = this.createSelect(['Belarus', 'Germany'], ['form-control']);

    this.city = createBlock(BlockType.div, ['city__block']);
    this.cityLabel = createLabel(['form-label'], 'City');
    this.cityInput = createInput(InputType.text, ['form-control']);
    this.cityInput.setAttribute('placeholder', 'Enter city');

    this.street = createBlock(BlockType.div, ['street__block']);
    this.streetLabel = createLabel(['form-label'], 'Street');
    this.streetInput = createInput(InputType.text, ['form-control']);
    this.streetInput.setAttribute('placeholder', 'Enter street');

    this.countryIndex = createBlock(BlockType.div, ['contry_index__block']);
    this.countryIndexLabel = createLabel(['form-label'], 'Country index');
    this.countryIndexInput = createInput(InputType.text, ['form-control']);
    this.countryIndexInput.setAttribute('placeholder', 'Enter country index');

    this.regBtn = createButton(['btn', 'btn-primary'], 'Registration');
  }

  createSelect(options: string[], classes: string[]): HTMLSelectElement {
    const select = document.createElement('select');
    select.classList.add(...classes);
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
    return select;
  }

  render() {
    const main = document.querySelector('main');

    if (main) {
      this.usernameLabel.append(this.usernameInput);
      const nameErrorElement = createBlock(BlockType.div, ['error-message']);
      this.usernameInput.addEventListener('input', () => validateNameInput(this.usernameInput, nameErrorElement));
      this.usernameContainer.append(this.usernameLabel, nameErrorElement);

      this.userLastnameLabel.append(this.userLastnameInput);
      const lastnameErrorElement = createBlock(BlockType.div, ['error-message']);
      this.userLastnameInput.addEventListener('input', () => validateLastNameInput(this.userLastnameInput, lastnameErrorElement));
      this.userLastnameContainer.append(this.userLastnameLabel, lastnameErrorElement);

      const emailErrorElement = createBlock(BlockType.div, ['error-message']);
      emailErrorElement.id = 'emailError';
      this.emailInput.addEventListener('input', () => validateEmailInput(this.emailInput, emailErrorElement));
      this.emailLabel.append(this.emailInput);
      this.emailContainer.append(this.emailLabel, emailErrorElement);

      this.passwordLabel.append(this.passwordInput);
      const passwordErrorElement = createBlock(BlockType.div, ['error-message']);
      this.passwordInput.addEventListener('input', () => validatePasswordInput(this.passwordInput, passwordErrorElement));
      this.passwordContainer.append(this.passwordLabel, passwordErrorElement);

      this.dateOfBirthLabel.append(this.dateOfBirthInput);
      const dateOfBirthElement = createBlock(BlockType.div, ['error-message']);
      this.dateOfBirthInput.addEventListener('input', () => validateDateOfBirthInput(this.dateOfBirthInput, dateOfBirthElement));
      this.dateOfBirth.append(this.dateOfBirthLabel, dateOfBirthElement);

      this.countryLabel.append(this.countrySelect);
      this.country.append(this.countryLabel);

      this.cityLabel.append(this.cityInput);
      const cityInputElement = createBlock(BlockType.div, ['error-message']);
      this.cityInput.addEventListener('input', () => validateCityInput(this.cityInput, cityInputElement));
      this.city.append(this.cityLabel, cityInputElement);

      this.streetLabel.append(this.streetInput);
      const streetInputElement = createBlock(BlockType.div, ['error-message']);
      this.streetInput.addEventListener('input', () => validateStreetInput(this.streetInput, streetInputElement));
      this.street.append(this.streetLabel, streetInputElement);

      this.countryIndexLabel.append(this.countryIndexInput);
      const countryIndexElement = createBlock(BlockType.div, ['error-message']);
      this.countryIndexInput.addEventListener('input', () => validatePostalCodeInput(
        this.countrySelect,
        this.countryIndexInput,
        countryIndexElement,
      ));
      this.countryIndex.append(this.countryIndexLabel, countryIndexElement);

      this.fieldset.append(
        this.legend,
        this.usernameContainer,
        this.userLastnameContainer,
        this.emailContainer,
        this.passwordContainer,
        this.dateOfBirth,
        this.country,
        this.city,
        this.street,
        this.countryIndex,
        this.regBtn,
      );

      this.regestrationContainer.append(this.fieldset);
      this.regestrationSection.append(this.regestrationContainer);
      main.append(this.regestrationSection);
    }
  }

  init(): void {
    this.render();
  }
}

export default Registartion;
