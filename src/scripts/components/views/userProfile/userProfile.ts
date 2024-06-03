import {
  onInputCityChange,
  onInputDateOfBirthChange,
  onInputEmailChange,
  onInputLastNameChange,
  onInputNameChange,
  onInputPasswordChange,
  onInputPostalCodeChange,
  onInputStreetChange,
} from '../../../services/registration/registrationButtons';
import { onEditModeButtonClick, onInputRadioChange, onSubmitUpdateAddressButtonClick, onSubmitUpdateUserButtonClick } from '../../../services/userProfile/userButtons';
import { edit } from '../../../services/utilities/SVGs';
import { decryptCipher } from '../../../services/utilities/encryptor';
import {
  createBlock,
  createButton,
  createForm,
  createInput,
  createLabel,
} from '../../../services/utilities/tags';
import { BlockType, InputType } from '../../types/enums';
import { IAddress, IUserProfile } from '../../types/interfaces';

export class UserProfile {
  static render(): HTMLElement {
    const user: IUserProfile = JSON.parse(localStorage.getItem('user') || '{}');

    const profile = createBlock(BlockType.div, ['profile']);

    const profileForm = createForm(['profile-form', 'login-form']);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('profile-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('text');
    legend.textContent = 'User Profile';

    fieldset.appendChild(legend);

    const editButton = createBlock(BlockType.div, ['edit-button']);
    editButton.innerHTML = edit;
    editButton.addEventListener('click', onEditModeButtonClick);

    fieldset.appendChild(editButton);

    const fields = [
      { label: 'First name', value: user.firstName, name: 'firstName', event: onInputNameChange },
      { label: 'Last name', value: user.lastName, name: 'lastName', event: onInputLastNameChange },
      { label: 'Date of birth', value: user.dateOfBirth, name: 'dateOfBirth', event: onInputDateOfBirthChange },
      { label: 'Email', value: user.email, name: 'email', event: onInputEmailChange },
    ];

    fields.forEach((field) => {
      const container = createBlock(BlockType.div, ['form-group']);
      const label = createLabel(['form-label', 'text', 'text-normal'], field.label);
      const input = createInput(
        InputType.text,
        ['form-control', 'text', 'text_small'],
        { name: 'placeholder', value: `Enter ${field.label.toLowerCase()}` },
        { name: 'value', value: field.value },
        { name: 'disabled', value: 'true' },
        { name: 'name', value: field.name }
      );
      input.addEventListener('keypress', field.event);
      container.appendChild(label);
      container.appendChild(input);
      fieldset.appendChild(container);
    });

    const passwordContainer = createBlock(BlockType.div, ['form-group']);

    const password = decryptCipher(localStorage.getItem('encryptPassword') || '');

    const passwordLabel = createLabel(['form-label', 'text', 'text-normal'], 'Password');
    const passwordInput = createInput(
      InputType.password,
      ['form-control', 'text', 'text_small'],
      {
        name: 'placeholder',
        value: 'Enter password',
      },
      { name: 'value', value: password },
      { name: 'disabled', value: 'true' },
      { name: 'name', value: 'password' }
    );
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

    fieldset.appendChild(passwordContainer);

    const addressSection = this.createAddressForm(
      'Addresses',
      user.billingAddresses,
      user.shippingAddresses,
      user.defaultBillingAddress,
      user.defaultShippingAddress
    );
    
    const saveButton = createButton(['btn', 'btn-primary'], 'Save', {name: 'disabled', value: 'true'});
    saveButton.addEventListener('click', onSubmitUpdateUserButtonClick);
    fieldset.appendChild(saveButton);
    
    profileForm.appendChild(fieldset);
    
    profile.appendChild(profileForm);
    profile.appendChild(addressSection);

    return profile;
  }

  static createAddressForm(
    title: string,
    billingAddresses: IAddress[],
    shippingAddresses: IAddress[],
    defaultBillingAddress: IAddress | null,
    defaultShippingAddress: IAddress | null
  ): HTMLFormElement {
    const addressForm = createForm(['address-section', 'login-form']);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('profile-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('text');
    legend.textContent = title;

    fieldset.appendChild(legend);

    const editButton = createBlock(BlockType.div, ['edit-button']);
    editButton.innerHTML = edit;
    editButton.addEventListener('click', onEditModeButtonClick);

    fieldset.appendChild(editButton);

    const allAddresses = [...billingAddresses, ...shippingAddresses].filter(
      (value, index, self) => self.findIndex((v) => v.id === value.id) === index
    );
    allAddresses.forEach((address) => {
      const addressContainer = this.createAddress(
        address,
        billingAddresses,
        shippingAddresses,
        defaultBillingAddress,
        defaultShippingAddress
      );
      fieldset.appendChild(addressContainer);
    });

    const saveButton = createButton(['btn', 'btn-primary'], 'Save', { name: 'disabled', value: 'true' });
    saveButton.addEventListener('click', onSubmitUpdateAddressButtonClick);
    fieldset.appendChild(saveButton);

    addressForm.appendChild(fieldset);

    return addressForm;
  }

  static createAddress(
    address: IAddress,
    billingAddresses: IAddress[],
    shippingAddresses: IAddress[],
    defaultBillingAddress: IAddress | null,
    defaultShippingAddress: IAddress | null
  ): HTMLElement {
    const addressContainer = createBlock(BlockType.div, ['address-container']);
    addressContainer.setAttribute('data-id', address.id || '');

    const addressFields = [
      {
        label: 'Street Name',
        value: address.streetName,
        name: 'streetName',
        event: onInputStreetChange,
      },
      {
        label: 'Street Number',
        value: address.streetNumber || '',
        name: 'streetNumber',
        event: onInputStreetChange,
      },
      { label: 'City', value: address.city, name: 'city', event: onInputCityChange },
      {
        label: 'Postal Code',
        value: address.postalCode,
        name: 'postalCode',
        event: onInputPostalCodeChange,
      },
      { label: 'Country', value: address.country, name: 'country', event: console.log },
    ];

    addressFields.forEach((field) => {
      const fieldContainer = createBlock(BlockType.div, ['form-group']);
      const label = createLabel(['form-label', 'text', 'text-normal'], field.label);
      let input;
      if (field.name === 'country') {
        input = document.createElement('select');
        input.classList.add('form-control', 'text');
        input.setAttribute('disabled', 'true');
        input.setAttribute('name', 'country');
        
        const option1 = document.createElement('option');
        option1.value = 'BY';
        option1.text = 'Belarus';
        option1.setAttribute('country', 'Belarus');

        const option2 = document.createElement('option');
        option2.value = 'GE';
        option2.text = 'Germany';
        option2.setAttribute('country', 'Germany');

        input.appendChild(option1);
        input.appendChild(option2);

        if (field.value === 'BY') {
          option1.setAttribute('selected', 'selected');
        } else {
          option2.setAttribute('selected', 'selected');
        }
      } else {
        input = createInput(
          InputType.text,
          ['form-control', 'text', 'text_small'],
          { name: 'placeholder', value: `Enter ${field.label.toLowerCase()}` },
          { name: 'value', value: field.value },
          { name: 'disabled', value: 'true' },
          {name: 'name', value: field.name}
        );
        input.addEventListener('keypress', field.event);
      }
      fieldContainer.appendChild(label);
      fieldContainer.appendChild(input);
      addressContainer.appendChild(fieldContainer);
    });

    const addressTypeContainer = createBlock(BlockType.div, ['type-container', 'form-group']);
    const addressTypeLabel = createLabel(['form-label', 'text', 'text-normal'], 'Address Type');

    addressTypeContainer.appendChild(addressTypeLabel);

    const checkboxShippingContainer = createBlock(BlockType.div, ['form-group']);
    const checkboxShipping = createInput(
      InputType.checkbox,
      ['form-checkbox'],
      { name: 'shipping', value: address.id },
      { name: 'disabled', value: 'true' },
      {name: 'name', value: 'shipping'}
    );
    const checkboxLabelShipping = createLabel(['form-label'], 'Shipping');
    if (shippingAddresses.some((a) => a.id === address.id)) {
      checkboxShipping.checked = true;
    }
    checkboxShippingContainer.appendChild(checkboxLabelShipping);
    checkboxShippingContainer.appendChild(checkboxShipping);

    const checkboxBillingContainer = createBlock(BlockType.div, ['form-group']);
    const checkboxBilling = createInput(
      InputType.checkbox,
      ['form-checkbox'],
      { name: 'billing', value: address.id },
      { name: 'disabled', value: 'true' },
      {name: 'name', value: 'billing'}
    );
    const checkboxLabelBilling = createLabel(['form-label'], 'Billing');
    if (billingAddresses.some((a) => a.id === address.id)) {
      checkboxBilling.checked = true;
    }
    checkboxBillingContainer.appendChild(checkboxLabelBilling);
    checkboxBillingContainer.appendChild(checkboxBilling);

    const radioDefaultShippingContainer = createBlock(BlockType.div, ['form-group']);
    const radioDefaultShipping = createInput(
      InputType.radio,
      ['form-radio'],
      { name: 'defaultShipping', value: address.id },
      { name: 'disabled', value: 'true' },
      { name: 'name', value: 'defaultShipping' }
    );
    const radioLabelDefaultShipping = createLabel(['form-label'], 'Default Shipping');
    if (defaultShippingAddress && defaultShippingAddress.id === address.id) {
      radioDefaultShipping.checked = true;
    }
    radioDefaultShipping.addEventListener('change', onInputRadioChange);
    radioDefaultShippingContainer.appendChild(radioLabelDefaultShipping);
    radioDefaultShippingContainer.appendChild(radioDefaultShipping);

    const radioDefaultBillingContainer = createBlock(BlockType.div, ['form-group']);
    const radioDefaultBilling = createInput(
      InputType.radio,
      ['form-radio'],
      { name: 'defaultBilling', value: address.id },
      { name: 'disabled', value: 'true' },
      { name: 'name', value: 'defaultBilling' }
    );
    const radioLabelDefaultBilling = createLabel(['form-label'], 'Default Billing');
    if (defaultBillingAddress && defaultBillingAddress.id === address.id) {
      radioDefaultBilling.checked = true;
    }
    radioDefaultBilling.addEventListener('change', onInputRadioChange);
    radioDefaultBillingContainer.appendChild(radioLabelDefaultBilling);
    radioDefaultBillingContainer.appendChild(radioDefaultBilling);

    addressTypeContainer.appendChild(checkboxShippingContainer);
    addressTypeContainer.appendChild(checkboxBillingContainer);
    addressTypeContainer.appendChild(radioDefaultShippingContainer);
    addressTypeContainer.appendChild(radioDefaultBillingContainer);

    addressContainer.appendChild(addressTypeContainer);
    addressContainer.appendChild(document.createElement('hr'));

    return addressContainer;
  }
}
