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
    errorMessages.push("Email address must contain an '@' symbol separating local part and domain name.");
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
