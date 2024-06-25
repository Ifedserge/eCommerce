export function encryptCipher(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + 3) % 26) + base);
      }
      if (char.match(/\d/)) {
        const code = char.charCodeAt(0);
        const base = 48;
        return String.fromCharCode(((code - base + 3) % 10) + base);
      }
      return char;
    })
    .join('');
}

export function decryptCipher(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base - 3 + 26) % 26) + base);
      }
      if (char.match(/\d/)) {
        const code = char.charCodeAt(0);
        const base = 48;
        return String.fromCharCode(((code - base - 3 + 10) % 10) + base);
      }
      return char;
    })
    .join('');
}
