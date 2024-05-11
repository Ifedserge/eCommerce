interface Attributes {
  name: string;
  value?: string;
}

interface BlockWithText {
  className: string;
  text: string;
}

export const createDiv = (className: string) => {
  const elem = document.createElement('div');
  elem.classList.add(className);
  return elem;
};

type InputTypes = 'text' | 'submit' | 'button' | 'password' | 'radio';

export const createInput = (
  inputType: InputTypes,
  className: string[],
  ...attributes:Attributes[]
) => {
  const elem = document.createElement('input');
  elem.setAttribute('type', inputType);
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createForm = (className: string) => {
  const elem = document.createElement('form');
  elem.setAttribute('class', className);
  return elem;
};

export const createLabel = (className: string[], text?: string, ...attributes:Attributes[]) => {
  const elem = document.createElement('label');
  className.forEach((item) => elem.classList.add(item));
  if (text) elem.innerText = text;
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createButton = (className: string[], text: string, ...attributes:Attributes[]) => {
  const elem = document.createElement('button');
  className.forEach((item) => elem.classList.add(item));
  elem.innerText = text;
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createP = (className: string, text?: string) => {
  const elem = document.createElement('p');
  elem.classList.add(className);
  if (text) elem.innerText = text;
  return elem;
};

export const createHeader = (className: string) => {
  const elem = document.createElement('header');
  elem.classList.add(className);
  return elem;
};

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const createHeading = ({ className, text }:BlockWithText, tag:Headings) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.innerText = text;
  return elem;
};

export const createMain = (className: string) => {
  const elem = document.createElement('main');
  elem.classList.add(className);
  return elem;
};

export const createLink = (className: string[], address: string, name: string) => {
  const elem = document.createElement('a');
  className.forEach((item) => elem.classList.add(item));
  elem.setAttribute('href', address);
  elem.append(name);
  return elem;
};

export const createFooter = (className: string) => {
  const elem = document.createElement('footer');
  elem.classList.add(className);
  return elem;
};
