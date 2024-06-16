export function checkLoginState(): boolean {
  const storage = window.localStorage;
  if (storage.expirationTime && storage.refreshToken && storage.token) return true;
  return false;
}

export function checkCart(): boolean {
  const storage = window.localStorage;
  if (storage.cartData) return true;
  return false;
}

export function deleteAnonCartData() {
  if (
    !checkLoginState() &&
    (localStorage.getItem('anonymousId') || localStorage.getItem('cartData'))
  )
    localStorage.clear();
}
