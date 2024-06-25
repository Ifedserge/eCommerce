import { decryptCipher, encryptCipher } from '../src/scripts/services/utilities/encryptor';

describe('encryptCipher', () => {
  test('encrypts lowercase letters correctly', () => {
    expect(encryptCipher('abc')).toBe('def');
  });

  test('encrypts uppercase letters correctly', () => {
    expect(encryptCipher('XYZ')).toBe('ABC');
  });

  test('encrypts numbers correctly', () => {
    expect(encryptCipher('123')).toBe('456');
  });

  test('encrypts a mix of letters and numbers correctly', () => {
    expect(encryptCipher('a1b2C3')).toBe('d4e5F6');
  });

  test('does not change non-alphanumeric characters', () => {
    expect(encryptCipher('a1! b2?')).toBe('d4! e5?');
  });

  test('handles empty string correctly', () => {
    expect(encryptCipher('')).toBe('');
  });

  test('wraps around correctly for letters', () => {
    expect(encryptCipher('xyz')).toBe('abc');
  });

  test('wraps around correctly for numbers', () => {
    expect(encryptCipher('789')).toBe('012');
  });
});

describe('decryptCipher', () => {
  test('decrypts lowercase letters correctly', () => {
    expect(decryptCipher('def')).toBe('abc');
  });

  test('decrypts uppercase letters correctly', () => {
    expect(decryptCipher('ABC')).toBe('XYZ');
  });

  test('decrypts numbers correctly', () => {
    expect(decryptCipher('456')).toBe('123');
  });

  test('decrypts a mix of letters and numbers correctly', () => {
    expect(decryptCipher('d4e5F6')).toBe('a1b2C3');
  });

  test('does not change non-alphanumeric characters', () => {
    expect(decryptCipher('d4! e5?')).toBe('a1! b2?');
  });

  test('handles empty string correctly', () => {
    expect(decryptCipher('')).toBe('');
  });

  test('wraps around correctly for letters', () => {
    expect(decryptCipher('abc')).toBe('xyz');
  });

  test('wraps around correctly for numbers', () => {
    expect(decryptCipher('012')).toBe('789');
  });

  test('decrypts encrypted text correctly', () => {
    const originalText = 'Hello, World! 123';
    const encryptedText = encryptCipher(originalText);
    expect(decryptCipher(encryptedText)).toBe(originalText);
  });
});
