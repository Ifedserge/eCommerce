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
import { decryptCipher } from '../../../services/utilities/encryptor';
import {
  createBlock,
  createForm,
  createHeading,
  createInput,
  createLabel,
} from '../../../services/utilities/tags';
import { BlockType, HeadingType, InputType } from '../../types/enums';
import { IAddress, IUserProfile } from '../../types/interfaces';

export class UserProfile {
  static render(): HTMLFormElement {
    const user: IUserProfile = JSON.parse(localStorage.getItem('user') || '{}');

    const profileForm = createForm(['profile-form', 'login-form']);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('profile-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('text');
    legend.textContent = 'User Profile';

    fieldset.appendChild(legend);

    const fields = [
      { label: 'First name', value: user.firstName, event: onInputNameChange },
      { label: 'Last name', value: user.lastName, event: onInputLastNameChange },
      { label: 'Date of birth', value: user.dateOfBirth, event: onInputDateOfBirthChange },
      { label: 'Email', value: user.email, event: onInputEmailChange },
    ];

    fields.forEach((field) => {
      const container = createBlock(BlockType.div, ['form-group']);
      const label = createLabel(['form-label', 'text', 'text-normal'], field.label);
      const input = createInput(
        InputType.text,
        ['form-control', 'text', 'text_small'],
        { name: 'placeholder', value: `Enter ${field.label.toLowerCase()}` },
        { name: 'value', value: field.value },
        { name: 'disabled', value: 'true' }
      );
      input.addEventListener('keypress', field.event);
      container.appendChild(label);
      container.appendChild(input);
      fieldset.appendChild(container);
    });

    const passwordContainer = createBlock(BlockType.div, ['form-group']);

    const password = decryptCipher(localStorage.getItem('password') || '');

    const passwordLabel = createLabel(['form-label', 'text', 'text-normal'], 'Password');
    const passwordInput = createInput(
      InputType.password,
      ['form-control', 'text', 'text_small'],
      {
        name: 'placeholder',
        value: 'Enter password',
      },
      { name: 'value', value: password },
      { name: 'disabled', value: 'true' }
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

    const addressSection = this.createAddressSection(
      'Addresses',
      user.billingAddresses,
      user.shippingAddresses,
      user.defaultBillingAddress,
      user.defaultShippingAddress
    );
    fieldset.appendChild(addressSection);

    profileForm.appendChild(fieldset);

    return profileForm;
  }

  static createAddressSection(
    title: string,
    billingAddresses: IAddress[],
    shippingAddresses: IAddress[],
    defaultBillingAddress: IAddress | null,
    defaultShippingAddress: IAddress | null
  ): HTMLElement {
    const addressSection = createBlock(BlockType.div, ['address-section', 'form-group']);

    const sectionTitle = createHeading(['form-label', 'text'], title, HeadingType.h5);
    addressSection.appendChild(sectionTitle);

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
      addressSection.appendChild(addressContainer);
    });

    return addressSection;
  }

  static createAddress(
    address: IAddress,
    billingAddresses: IAddress[],
    shippingAddresses: IAddress[],
    defaultBillingAddress: IAddress | null,
    defaultShippingAddress: IAddress | null
  ): HTMLElement {
    const addressContainer = createBlock(BlockType.div, ['address-container']);

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

        const option1 = document.createElement('option');
        option1.value = 'Belarus';
        option1.text = 'Belarus';

        const option2 = document.createElement('option');
        option2.value = 'Germany';
        option2.text = 'Germany';

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
          { name: 'disabled', value: 'true' }
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
      { name: 'disabled', value: 'true' }
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
      { name: 'disabled', value: 'true' }
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
      { name: 'disabled', value: 'true' }
    );
    const radioLabelDefaultShipping = createLabel(['form-label'], 'Default Shipping');
    if (defaultShippingAddress && defaultShippingAddress.id === address.id) {
      radioDefaultShipping.checked = true;
    }
    radioDefaultShippingContainer.appendChild(radioLabelDefaultShipping);
    radioDefaultShippingContainer.appendChild(radioDefaultShipping);

    const radioDefaultBillingContainer = createBlock(BlockType.div, ['form-group']);
    const radioDefaultBilling = createInput(
      InputType.radio,
      ['form-radio'],
      { name: 'defaultBilling', value: address.id },
      { name: 'disabled', value: 'true' }
    );
    const radioLabelDefaultBilling = createLabel(['form-label'], 'Default Billing');
    if (defaultBillingAddress && defaultBillingAddress.id === address.id) {
      radioDefaultBilling.checked = true;
    }
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
