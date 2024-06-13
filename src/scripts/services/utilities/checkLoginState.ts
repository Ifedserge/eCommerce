export function checkLoginState(): boolean {
  const storage = window.localStorage;
  if (storage.expirationTime && storage.refreshToken && storage.token) return true;
  return false;
}

export function checkCart(): boolean {
  const storage = window.localStorage;
  if (storage.cartId) return true;
  return false;
}
