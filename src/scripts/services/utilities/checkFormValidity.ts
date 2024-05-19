export function checkFormValidity(registrationSection: HTMLElement) {
  const nameInput = registrationSection.querySelector('.form-control[name="username"]') as HTMLInputElement;
  const lastNameInput = registrationSection.querySelector('.form-control[name="lastname"]') as HTMLInputElement;
  const emailInput = registrationSection.querySelector('.form-control[name="email"]') as HTMLInputElement;
  const passwordInput = registrationSection.querySelector('.form-control[name="password"]') as HTMLInputElement;
  const dateOfBirthInput = registrationSection.querySelector('.form-control[name="dateOfBirth"]') as HTMLInputElement;
  const cityInput = registrationSection.querySelector('.form-control[name="city"]') as HTMLInputElement;
  const streetInput = registrationSection.querySelector('.form-control[name="street"]') as HTMLInputElement;
  const countryIndexInput = registrationSection.querySelector('.form-control[name="countryIndex"]') as HTMLInputElement;

  const nameValid = nameInput && !nameInput.classList.contains('error') && nameInput.value.trim() !== '';
  const lastNameValid = lastNameInput && !lastNameInput.classList.contains('error') && lastNameInput.value.trim() !== '';
  const emailValid = emailInput && !emailInput.classList.contains('error') && emailInput.value.trim() !== '';
  const passwordValid = passwordInput && !passwordInput.classList.contains('error') && passwordInput.value.trim() !== '';
  const dateOfBirthValid = dateOfBirthInput && !dateOfBirthInput.classList.contains('error') && dateOfBirthInput.value.trim() !== '';
  const cityValid = cityInput && !cityInput.classList.contains('error') && cityInput.value.trim() !== '';
  const streetValid = streetInput && !streetInput.classList.contains('error') && streetInput.value.trim() !== '';
  const countryIndexValid = countryIndexInput && !countryIndexInput.classList.contains('error') && countryIndexInput.value.trim() !== '';

  const isValid = nameValid
   && lastNameValid
   && emailValid
   && passwordValid
   && dateOfBirthValid
   && cityValid
   && streetValid
   && countryIndexValid;
  const regBtn = registrationSection.querySelector('.btn-primary') as HTMLButtonElement;
  regBtn.disabled = !isValid;
}
