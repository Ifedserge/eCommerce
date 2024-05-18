import {
  createBlock, createButton, createForm, createInput, createLabel,
} from '../../../services/utilities/tags';
import { onInputEmailChange } from '../../../services/login/loginButtons';
import { BlockType, InputType } from '../../types/enums';

class Registartion {
  regestrationSection: HTMLElement;

  regestrationContainer: HTMLElement;

  fieldset: HTMLElement;

  legend: HTMLElement;

  usernameContainer: HTMLElement;

  usernameLabel: HTMLElement;

  usernameInput: HTMLElement;

  userLastnameContainer: HTMLElement;

  userLastnameLabel: HTMLElement;

  userLastnameInput: HTMLElement;

  emailContainer: HTMLElement;

  emailLabel: HTMLElement;

  emailInput: HTMLElement;

  passwordContainer: HTMLElement;

  passwordLabel: HTMLElement;

  passwordInput: HTMLElement;

  dateOfBirth: HTMLElement;

  dateOfBirthLabel:HTMLElement;

  dateOfBirthInput:HTMLElement;

  country: HTMLElement;

  countryLabel: HTMLElement;

  countrySelect: HTMLElement;

  city: HTMLElement;

  cityLabel: HTMLElement;

  cityInput: HTMLElement;

  street: HTMLElement;

  streetLabel: HTMLElement;

  streetInput: HTMLElement;

  countryIndex: HTMLElement;

  countryIndexLabel: HTMLElement;

  countryIndexInput: HTMLElement;

  regBtn: HTMLElement;

  constructor() {
    this.regestrationSection = createBlock(BlockType.section, ['registration']);
    this.regestrationContainer = createForm(['regestration__container']);
    this.fieldset = document.createElement('fieldset');
    this.fieldset.classList.add('fieldset');

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

    this.emailContainer = createBlock(BlockType.div, ['form-group']);
    this.emailLabel = createLabel(['form-label'], 'Email');
    this.emailInput = createInput(InputType.text, ['form-control']);
    this.emailInput.setAttribute('placeholder', 'Enter email');

    this.passwordContainer = createBlock(BlockType.div, ['form-group']);
    this.passwordLabel = createLabel(['form-label'], 'Password');
    this.passwordInput = createInput(InputType.password, ['form-control'], { name: 'placeholder', value: 'Enter password' });

    this.dateOfBirth = createBlock(BlockType.div, ['form-group']);
    this.dateOfBirthLabel = createLabel(['form-label'], 'Date of birth');
    this.dateOfBirthInput = createInput(InputType.text, ['form-control']);
    this.dateOfBirthInput.setAttribute('placeholder', 'Enter date of birth');

    this.country = createBlock(BlockType.div, ['form-group']);
    this.countryLabel = createLabel(['form-label'], 'Country');
    this.countrySelect = this.createSelect(['Belarus', 'Germany'], ['form-control']);

    this.city = createBlock(BlockType.div, ['form-group']);
    this.cityLabel = createLabel(['form-label'], 'City');
    this.cityInput = createInput(InputType.text, ['form-control']);
    this.cityInput.setAttribute('placeholder', 'Enter city');

    this.street = createBlock(BlockType.div, ['form-group']);
    this.streetLabel = createLabel(['form-label'], 'City');
    this.streetInput = createInput(InputType.text, ['form-control']);
    this.streetInput.setAttribute('placeholder', 'Enter city');

    this.countryIndex = createBlock(BlockType.div, ['form-group']);
    this.countryIndexLabel = createLabel(['form-label'], 'Country index');
    this.countryIndexInput = createInput(InputType.text, ['form-control']);
    this.countryIndexInput.setAttribute('placeholder', 'Enter country index');

    this.regBtn = createButton(['btn', 'btn-primary'], 'Registration');
  }

  createSelect(options: string[], classes: string[]): HTMLElement {
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
      this.usernameContainer.append(this.usernameLabel);

      this.userLastnameLabel.append(this.userLastnameInput);
      this.userLastnameContainer.append(this.userLastnameLabel);

      this.emailInput.addEventListener('keypress', onInputEmailChange);
      this.emailLabel.append(this.emailInput);
      this.emailContainer.append(this.emailLabel);

      this.passwordLabel.append(this.passwordInput);
      this.passwordContainer.append(this.passwordLabel);

      this.dateOfBirthLabel.append(this.dateOfBirthInput);
      this.dateOfBirth.append(this.dateOfBirthLabel);

      this.countryLabel.append(this.countrySelect);
      this.country.append(this.countryLabel);

      this.cityLabel.append(this.cityInput);
      this.city.append(this.cityLabel);

      this.streetLabel.append(this.streetInput);
      this.street.append(this.streetLabel);

      this.countryIndexLabel.append(this.countryIndexInput);
      this.countryIndex.append(this.countryIndexLabel);

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
