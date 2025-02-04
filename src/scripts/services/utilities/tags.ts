import { ITagAttributes } from '../../components/types/interfaces';
import { BlockType, InputType, HeadingType } from '../../components/types/enums';

export const createBlock = (type: BlockType, className: string[]) => {
  const elem = document.createElement(type);
  className.forEach((item) => elem.classList.add(item));
  return elem;
};

export const createInput = (
  inputType: InputType,
  className: string[],
  ...attributes: ITagAttributes[]
) => {
  const elem = document.createElement('input');
  elem.setAttribute('type', inputType);
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createForm = (className: string[], ...attributes: ITagAttributes[]) => {
  const elem = document.createElement('form');
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createLabel = (
  className: string[],
  text?: string,
  ...attributes: ITagAttributes[]
) => {
  const elem = document.createElement('label');
  className.forEach((item) => elem.classList.add(item));
  if (text) elem.innerText = text;
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createButton = (
  className: string[],
  text: string,
  ...attributes: ITagAttributes[]
) => {
  const elem = document.createElement('button');
  className.forEach((item) => elem.classList.add(item));
  elem.innerText = text;
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createP = (className: string[], text?: string) => {
  const elem = document.createElement('p');
  className.forEach((item) => elem.classList.add(item));
  if (text) elem.innerText = text;
  return elem;
};

export const createDel = (className: string[], text: string) => {
  const elem = document.createElement('del');
  className.forEach((item) => elem.classList.add(item));
  elem.innerText = text;
  return elem;
};

export const createSpan = (className: string[], text: string) => {
  const elem = document.createElement('span');
  className.forEach((item) => elem.classList.add(item));
  elem.innerText = text;
  return elem;
};

export const createHeading = (className: string[], text: string, tag: HeadingType) => {
  const elem = document.createElement(tag);
  className.forEach((item) => elem.classList.add(item));
  elem.innerText = text;
  return elem;
};

export const createLink = (className: string[], address: string, name: string) => {
  const elem = document.createElement('a');
  className.forEach((item) => elem.classList.add(item));
  elem.setAttribute('href', address);
  elem.append(name);
  return elem;
};

export const createSelect = (
  options: string[],
  className: string[],
  ...attributes: ITagAttributes[]
) => {
  const elem = document.createElement('select');
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  options.forEach((option) => {
    const optionElem = document.createElement('option');
    optionElem.value = option;
    optionElem.textContent = option;
    elem.appendChild(optionElem);
  });
  return elem;
};

export const createImg = (
  className: string[],
  src: string,
  alt: string,
  height?: number,
  width?: number
) => {
  const elem = document.createElement('img');
  className.forEach((item) => elem.classList.add(item));
  elem.setAttribute('src', `${src}`);
  elem.setAttribute('alt', `${alt}`);
  if (height) elem.setAttribute('height', `${height}px`);
  if (width) elem.setAttribute('width', `${width}px`);

  return elem;
};
