import { checkLoginState } from '../src/scripts/services/utilities/checkLoginState';

test('check local storage', () => {
  localStorage.setItem('expirationTime', 'test expirationTime');
  localStorage.setItem('refreshToken', 'tets refreshToken');
  localStorage.setItem('token', 'tets token');
  expect(checkLoginState()).toStrictEqual(true);
});

test('check local storage', () => {
  localStorage.clear();
  expect(checkLoginState()).toStrictEqual(false);
});
