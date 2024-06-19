import {
  onInputCityChange,
  onInputDateOfBirthChange,
  onInputEmailChange,
  onInputLastNameChange,
  onInputNameChange,
  onInputPasswordChange,
  onInputStreetChange,
} from '../../../services/registration/registrationButtons';
import {
  onEditModeButtonClick,
  onInputPostalCodeChange,
  onInputRadioChange,
  onRemoveAddress,
  onSubmitUpdateAddressButtonClick,
  onSubmitUpdateUserButtonClick,
} from '../../../services/userProfile/userButtons';
import { deleteIcon, edit } from '../../../services/utilities/SVGs';
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

    const editButton = createBlock(BlockType.div, ['edit-button']);
    editButton.innerHTML = edit;
    editButton.addEventListener('click', onEditModeButtonClick);

    fieldset.append(legend, editButton);

    const fields = [
      { label: 'First name', value: user.firstName, name: 'firstName', event: onInputNameChange },
      { label: 'Last name', value: user.lastName, name: 'lastName', event: onInputLastNameChange },
      {
        label: 'Date of birth',
        value: user.dateOfBirth,
        name: 'dateOfBirth',
        event: onInputDateOfBirthChange,
      },
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
      fieldset.appendChild(container).append(label, input);
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

    fieldset.appendChild(passwordContainer).append(passwordLabel, passwordInput, eye);

    const addressSection = this.createAddressForm(
      'Addresses',
      user.billingAddresses,
      user.shippingAddresses,
      user.defaultBillingAddress,
      user.defaultShippingAddress
    );

    const saveButton = createButton(['btn', 'btn-primary'], 'Save', {
      name: 'disabled',
      value: 'true',
    });
    saveButton.addEventListener('click', onSubmitUpdateUserButtonClick);
    fieldset.appendChild(saveButton);

    profileForm.appendChild(fieldset);

    profile.append(profileForm, addressSection);

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

    const editButton = createBlock(BlockType.div, ['edit-button']);
    editButton.innerHTML = edit;
    editButton.addEventListener('click', onEditModeButtonClick);

    fieldset.append(legend, editButton);

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

    const buttonsContainer = createBlock(BlockType.div, ['buttons']);

    const saveButton = createButton(['btn', 'btn-primary'], 'Save', {
      name: 'disabled',
      value: 'true',
    });
    saveButton.addEventListener('click', onSubmitUpdateAddressButtonClick);

    const addButton = createButton(['btn', 'btn-primary'], 'Add', {
      name: 'disabled',
      value: 'true',
    });
    addButton.addEventListener('click', (event) => {
      event.preventDefault();

      const address: IAddress = {
        id: '',
        city: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
        country: '',
      };

      const addressBlock = this.createAddress(address, [], [], null, null, false);
      buttonsContainer.before(addressBlock);
    });

    fieldset.appendChild(buttonsContainer).append(saveButton, addButton);

    addressForm.appendChild(fieldset);

    return addressForm;
  }

  static createAddress(
    address: IAddress,
    billingAddresses: IAddress[],
    shippingAddresses: IAddress[],
    defaultBillingAddress: IAddress | null,
    defaultShippingAddress: IAddress | null,
    disabled: boolean = true
  ): HTMLElement {
    const addressContainer = createBlock(BlockType.div, ['address-container']);
    addressContainer.setAttribute('data-id', address.id || '');

    const deleteButton = createBlock(BlockType.div, ['delete-button']);
    deleteButton.innerHTML = deleteIcon;
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      addressContainer.remove();
      onRemoveAddress(event);
    });
    disabled ? (deleteButton.style.display = 'none') : '';

    addressContainer.appendChild(deleteButton);

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
      { label: 'Country', value: address.country, name: 'country', event: () => {} },
    ];

    addressFields.forEach((field) => {
      const fieldContainer = createBlock(BlockType.div, ['form-group']);
      const label = createLabel(['form-label', 'text', 'text-normal'], field.label);
      let input;
      if (field.name === 'country') {
        input = document.createElement('select');
        input.classList.add('form-control', 'text');
        disabled ? input.setAttribute('disabled', 'true') : '';
        input.setAttribute('name', 'country');

        const option1 = document.createElement('option');
        option1.value = 'BY';
        option1.text = 'Belarus';
        option1.setAttribute('country', 'Belarus');

        const option2 = document.createElement('option');
        option2.value = 'GE';
        option2.text = 'Germany';
        option2.setAttribute('country', 'Germany');

        input.append(option1, option2);

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
          { name: 'name', value: field.name }
        );
        disabled ? input.setAttribute('disabled', 'true') : '';
        input.addEventListener('keypress', field.event);
      }
      addressContainer.appendChild(fieldContainer).append(label, input);
    });

    const addressTypeContainer = createBlock(BlockType.div, ['type-container', 'form-group']);
    const addressTypeLabel = createLabel(['form-label', 'text', 'text-normal'], 'Address Type');

    addressTypeContainer.appendChild(addressTypeLabel);

    const checkboxShippingContainer = createBlock(BlockType.div, ['form-group']);
    const checkboxShipping = createInput(
      InputType.checkbox,
      ['form-checkbox'],
      { name: 'shipping', value: address.id },
      { name: 'name', value: 'shipping' }
    );
    disabled ? checkboxShipping.setAttribute('disabled', 'true') : '';
    const checkboxLabelShipping = createLabel(['form-label'], 'Shipping');
    if (shippingAddresses.some((a) => a.id === address.id)) {
      checkboxShipping.checked = true;
    }
    checkboxShippingContainer.append(checkboxLabelShipping, checkboxShipping);

    const checkboxBillingContainer = createBlock(BlockType.div, ['form-group']);
    const checkboxBilling = createInput(
      InputType.checkbox,
      ['form-checkbox'],
      { name: 'billing', value: address.id },
      { name: 'name', value: 'billing' }
    );
    disabled ? checkboxBilling.setAttribute('disabled', 'true') : '';
    const checkboxLabelBilling = createLabel(['form-label'], 'Billing');
    if (billingAddresses.some((a) => a.id === address.id)) {
      checkboxBilling.checked = true;
    }
    checkboxBillingContainer.append(checkboxLabelBilling, checkboxBilling);

    const radioDefaultShippingContainer = createBlock(BlockType.div, ['form-group']);
    const radioDefaultShipping = createInput(
      InputType.radio,
      ['form-radio'],
      { name: 'defaultShipping', value: address.id },
      { name: 'name', value: 'defaultShipping' }
    );
    disabled ? radioDefaultShipping.setAttribute('disabled', 'true') : '';
    const radioLabelDefaultShipping = createLabel(['form-label'], 'Default Shipping');
    if (defaultShippingAddress && defaultShippingAddress.id === address.id) {
      radioDefaultShipping.checked = true;
    }
    radioDefaultShipping.addEventListener('change', onInputRadioChange);
    radioDefaultShippingContainer.append(radioLabelDefaultShipping, radioDefaultShipping);

    const radioDefaultBillingContainer = createBlock(BlockType.div, ['form-group']);
    const radioDefaultBilling = createInput(
      InputType.radio,
      ['form-radio'],
      { name: 'defaultBilling', value: address.id },
      { name: 'name', value: 'defaultBilling' }
    );
    disabled ? radioDefaultBilling.setAttribute('disabled', 'true') : '';
    const radioLabelDefaultBilling = createLabel(['form-label'], 'Default Billing');
    if (defaultBillingAddress && defaultBillingAddress.id === address.id) {
      radioDefaultBilling.checked = true;
    }
    radioDefaultBilling.addEventListener('change', onInputRadioChange);
    radioDefaultBillingContainer.append(radioLabelDefaultBilling, radioDefaultBilling);

    addressTypeContainer.append(
      checkboxShippingContainer,
      checkboxBillingContainer,
      radioDefaultShippingContainer,
      radioDefaultBillingContainer
    );

    addressContainer.append(addressTypeContainer, document.createElement('hr'));

    return addressContainer;
  }
}
