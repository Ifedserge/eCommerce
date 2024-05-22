const functions = require('../src/scripts/services/utilities/validation');

test('validate Email', () => {
  expect(functions.validateEmail('test@mail.ru')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateEmail('testmail.ru')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      "Email address must contain an '@' symbol separating local part and domain name.",
    ],
  });
  expect(functions.validateEmail('   test@mail.ru')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must not contain leading or trailing whitespace.',
    ],
  });
  expect(functions.validateEmail('test@mail.ru   ')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must not contain leading or trailing whitespace.',
    ],
  });
  expect(functions.validateEmail('test@')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must contain a domain name (e.g., example.com).',
    ],
  });
  expect(functions.validateEmail('test@mail.')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Email address must be properly formatted (e.g., user@example.com).',
      'Email address must contain a valid domain extension (e.g., .com).',
    ],
  });
});

test('validate password', () => {
  expect(functions.validatePassword('RSSchool1')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validatePassword('Rss1')).toStrictEqual({
    isValid: false,
    errorMessages: ['Password must be at least 8 characters long.'],
  });
  expect(functions.validatePassword('Rss')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(functions.validatePassword('rss')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one uppercase letter (A-Z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(functions.validatePassword('RSS')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must be at least 8 characters long.',
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(functions.validatePassword('rsschool1')).toStrictEqual({
    isValid: false,
    errorMessages: ['Password must contain at least one uppercase letter (A-Z).'],
  });
  expect(functions.validatePassword('rsschool')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one uppercase letter (A-Z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(functions.validatePassword('RSSCHOOL')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
    ],
  });
  expect(functions.validatePassword('   RSSCHOOL')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
      'Password must not contain leading or trailing whitespace.',
    ],
  });
  expect(functions.validatePassword('RSSCHOOL  ')).toStrictEqual({
    isValid: false,
    errorMessages: [
      'Password must contain at least one lowercase letter (a-z).',
      'Password must contain at least one digit (0-9).',
      'Password must not contain leading or trailing whitespace.',
    ],
  });
});

test('validate name', () => {
  expect(functions.validateName('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateName('РСскул')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateName('111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
  expect(functions.validateName('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
  expect(functions.validateName('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Name must contain only letters and at least one character.'],
  });
});

test('validate last name', () => {
  expect(functions.validateLastName('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateLastName('РСскул')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateLastName('111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
  expect(functions.validateLastName('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
  expect(functions.validateLastName('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Last name must contain only letters and at least one character.'],
  });
});

test('validate date of birth', () => {
  expect(functions.validateDateOfBirth('1992-02-03')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateDateOfBirth('03-02-1992')).toStrictEqual({
    isValid: false,
    errorMessages: ['Date of birth must be in the format YYYY-MM-DD.'],
  });
  expect(functions.validateDateOfBirth('sdf111')).toStrictEqual({
    isValid: false,
    errorMessages: ['Date of birth must be in the format YYYY-MM-DD.'],
  });
  expect(functions.validateDateOfBirth('2012-02-03')).toStrictEqual({
    isValid: false,
    errorMessages: ['You must be at least 16 years old.'],
  });
});

test('validate street', () => {
  expect(functions.validateStreet('RSSchool')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateStreet('')).toStrictEqual({
    isValid: false,
    errorMessages: ['Street must contain at least one character.'],
  });
});

test('validate city', () => {
  expect(functions.validateCity('Minsk')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateCity('Минск')).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validateCity('Boobs228')).toStrictEqual({
    isValid: false,
    errorMessages: ['City must contain only letters and spaces.'],
  });
});

test('validate post code', () => {
  expect(functions.validatePostalCode('Belarus', 123456)).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validatePostalCode('Germany', 12345)).toStrictEqual({
    isValid: true,
    errorMessages: [],
  });
  expect(functions.validatePostalCode('Belarus', 12345)).toStrictEqual({
    isValid: false,
    errorMessages: ['Postal code for Belarus must be a 6-digit number.'],
  });
  expect(functions.validatePostalCode('Germany', 123456)).toStrictEqual({
    isValid: false,
    errorMessages: ['Postal code for Germany must be a 5-digit number.'],
  });
  expect(functions.validatePostalCode('Boobs', 123456)).toStrictEqual({
    isValid: false,
    errorMessages: ['Invalid country selected.'],
  });
});
