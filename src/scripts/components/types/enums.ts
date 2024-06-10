export enum InputType {
  text = 'text',
  submit = 'submit',
  button = 'button',
  password = 'password',
  radio = 'radio',
  checkbox = 'checkbox',
  reset = 'reset',
  range = 'range',
}

export enum HeadingType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export enum BlockType {
  header = 'header',
  footer = 'footer',
  main = 'main',
  aside = 'aside',
  nav = 'nav',
  article = 'article',
  section = 'section',
  div = 'div',
}

export enum NotificationType {
  success = 'success',
  info = 'info',
  error = 'error',
}

export enum Pages {
  index = 'index',
  login = 'login',
  registration = 'registration',
  user = 'user',
  notFound = 'not-found',
  catalogue = 'catalogue',
  product = 'product',
  man = 'man',
  man_jeans = 'man-jeans',
  man_jackets = 'man-jackets',
  woman = 'woman',
  woman_jeans = 'woman-jeans',
  woman_jackets = 'woman-jackets',
  basket = 'basket',
  about = 'about-us',
}

export enum IdCategories {
  man = '1309b310-7a8e-4651-b120-91b5f3e84e08',
  woman = '0fc64765-8869-4e15-8fa0-60e712c70e12',
  man_jeans = '19d2c3ef-dc32-407f-b7e2-5ce0bb18d76e',
  man_jackets = 'bea90c56-89ac-477a-9979-6ade2c7dada9',
  woman_jeans = '8c4fc8bb-898c-46f7-808a-0f10cd801e11',
  woman_jackets = '6a9e1de6-efdd-496d-bc34-210262523a1a',
}

export enum SortType {
  asc = 'asc',
  desc = 'desc',
  none = 'none',
}

export enum SortButtonText {
  asc = 'A-Z',
  desc = 'Z-A',
}

export enum SortingValue {
  name = 'name.en-GB',
  price = 'price',
}

export enum SortPriceButtonText {
  chip = 'Chip first',
  expensive = 'Expensive first',
}
