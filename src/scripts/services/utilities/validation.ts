import { calculateAge } from './calculateAge';

export function validateEmail(email: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessages.push('Email address must be properly formatted (e.g., user@example.com).');
  }

  if (email.trim() !== email) {
    errorMessages.push('Email address must not contain leading or trailing whitespace.');
  }

  if (!email.includes('@')) {
    errorMessages.push(
      "Email address must contain an '@' symbol separating local part and domain name."
    );
  }

  const atIndex = email.lastIndexOf('@');
  const domain = email.slice(atIndex + 1);
  if (!domain.includes('.')) {
    errorMessages.push('Email address must contain a domain name (e.g., example.com).');
  } else {
    const dotIndex = domain.lastIndexOf('.');
    const domainExtension = domain.slice(dotIndex + 1);
    if (!domainExtension || domainExtension.length < 2) {
      errorMessages.push('Email address must contain a valid domain extension (e.g., .com).');
    }
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validatePassword(password: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  if (password.length < 8) {
    errorMessages.push('Password must be at least 8 characters long.');
  }

  if (!/[A-Z]/.test(password)) {
    errorMessages.push('Password must contain at least one uppercase letter (A-Z).');
  }

  if (!/[a-z]/.test(password)) {
    errorMessages.push('Password must contain at least one lowercase letter (a-z).');
  }

  if (!/\d/.test(password)) {
    errorMessages.push('Password must contain at least one digit (0-9).');
  }

  if (password.trim() !== password) {
    errorMessages.push('Password must not contain leading or trailing whitespace.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validateName(name: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  if (!nameRegex.test(name)) {
    errorMessages.push('Name must contain only letters and at least one character.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validateLastName(lastName: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  const lastNameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  if (!lastNameRegex.test(lastName)) {
    errorMessages.push('Last name must contain only letters and at least one character.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validateDateOfBirth(dateOfBirth: string): {
  isValid: boolean;
  errorMessages: string[];
} {
  const errorMessages: string[] = [];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateOfBirth)) {
    errorMessages.push('Date of birth must be in the format YYYY-MM-DD.');
  } else {
    const birthDate = new Date(dateOfBirth);
    if (Number.isNaN(birthDate.getTime())) {
      errorMessages.push('Invalid date.');
    } else {
      const age = calculateAge(birthDate);
      if (age < 16) {
        errorMessages.push('You must be at least 16 years old.');
      }
    }
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validateStreet(street: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  if (street.trim().length === 0) {
    errorMessages.push('Street must contain at least one character.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validateCity(city: string): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  const cityRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  if (!cityRegex.test(city)) {
    errorMessages.push('City must contain only letters and spaces.');
  }

  if (city.trim().length === 0) {
    errorMessages.push('City must contain at least one character.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export function validatePostalCode(
  country: string,
  postalCode: string
): { isValid: boolean; errorMessages: string[] } {
  const errorMessages: string[] = [];

  if (country === 'Belarus') {
    const belarusRegex = /^\d{6}$/;
    if (!belarusRegex.test(postalCode)) {
      errorMessages.push('Postal code for Belarus must be a 6-digit number.');
    }
  } else if (country === 'Germany') {
    const germanyRegex = /^\d{5}$/;
    if (!germanyRegex.test(postalCode)) {
      errorMessages.push('Postal code for Germany must be a 5-digit number.');
    }
  } else {
    errorMessages.push('Invalid country selected.');
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}
