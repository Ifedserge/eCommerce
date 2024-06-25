export function checkLoginState(): boolean {
  const storage = window.localStorage;
  if (storage.expirationTime && storage.refreshToken && storage.token) return true;
  return false;
}
