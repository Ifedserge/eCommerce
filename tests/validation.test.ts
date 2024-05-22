import {
  validateEmail,
  validatePassword,
  validateName,
  validateLastName,
  validateDateOfBirth,
  validateStreet,
  validateCity,
  validatePostalCode,
} from '../src/scripts/services/utilities/validation';

test('validate Email', () => {
  expect(validateEmail('test@mail.ru')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateEmail('testmail.ru')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      "Email address must contain an '@' symbol separating local part and domain name.",
    ],
  });
  expect(validateEmail('   test@mail.ru')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must not contain leading or trailing whitespace.',
    ],
  });
  expect(validateEmail('test@mail.ru   ')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must not contain leading or trailing whitespace.',
    ],
  });
  expect(validateEmail('test@')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must contain a domain name (e.g., example.com).',
    ],
  });
  expect(validateEmail('test@mail.')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must contain a valid domain extension (e.g., .com).',
    ],
  });
});

test('validate password', () => {
  expect(validatePassword('RSSchool1')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validatePassword('Rss1')).toStrictEqual({
    isValid: false,
    errorMessages: ['Password must be at least 8 characters long.'],
  });
  expect(validatePassword('Rss')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(validatePassword('rss')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one uppercase letter (A-Z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(validatePassword('RSS')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(validatePassword('rsschool1')).toStrictEqual({
    isValid: false,
    errorMessages: ['Password must contain at least one uppercase letter (A-Z).'],
  });
  expect(validatePassword('rsschool')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one uppercase letter (A-Z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(validatePassword('RSSCHOOL')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(validatePassword('   RSSCHOOL')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
      'Password must not contain leading or trailing whitespace.',
    ],
  });
  expect(validatePassword('RSSCHOOL  ')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
      'Password must not contain leading or trailing whitespace.',
    ],
  });
});

test('validate name', () => {
  expect(validateName('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateName('РСскул')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateName('111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
  expect(validateName('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
  expect(validateName('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
});

test('validate last name', () => {
  expect(validateLastName('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateLastName('РСскул')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateLastName('111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
  expect(validateLastName('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
  expect(validateLastName('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
});

test('validate date of birth', () => {
  expect(validateDateOfBirth('1992-02-03')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateDateOfBirth('03-02-1992')).toStrictEqual({
    isValid: false,
    errorMessages: ['Date of birth must be in the format YYYY-MM-DD.'],
  });
  expect(validateDateOfBirth('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Date of birth must be in the format YYYY-MM-DD.'],
  });
  expect(validateDateOfBirth('2012-02-03')).toStrictEqual({
    isValid: false,
    errorMessages: ['You must be at least 16 years old.'],
  });
});

test('validate street', () => {
  expect(validateStreet('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateStreet('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Street must contain at least one character.'],
  });
});

test('validate city', () => {
  expect(validateCity('Minsk')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateCity('Минск')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validateCity('Boobs228')).toStrictEqual({
    isValid: false,
    errorMessages: ['City must contain only letters and spaces.'],
  });
  expect(validateCity('')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'City must contain only letters and spaces.',
      'City must contain at least one character.',
    ],
  });
});

test('validate post code', () => {
  expect(validatePostalCode('Belarus', '123456')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validatePostalCode('Germany', '12345')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(validatePostalCode('Belarus', '12345')).toStrictEqual({
    isValid: false,
    errorMessages: ['Postal code for Belarus must be a 6-digit number.'],
  });
  expect(validatePostalCode('Germany', '123456')).toStrictEqual({
    isValid: false,
    errorMessages: ['Postal code for Germany must be a 5-digit number.'],
  });
  expect(validatePostalCode('Boobs', '123456')).toStrictEqual({
    isValid: false,
    errorMessages: ['Invalid country selected.'],
  });
});
