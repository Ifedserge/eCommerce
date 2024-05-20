import { TagAttributes } from '../../components/types/interfaces';
import { BlockType, InputType, HeadingType } from '../../components/types/enums';

export const createBlock = (type: BlockType, className: string[]) => {
  const elem = document.createElement(type);
  className.forEach((item) => elem.classList.add(item));
  return elem;
};

export const createInput = (
  inputType: InputType,
  className: string[],
  ...attributes: TagAttributes[]
) => {
  const elem = document.createElement('input');
  elem.setAttribute('type', inputType);
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createForm = (className: string[], ...attributes: TagAttributes[]) => {
  const elem = document.createElement('form');
  className.forEach((item) => elem.classList.add(item));
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createLabel = (className: string[], text?: string, ...attributes: TagAttributes[]) => {
  const elem = document.createElement('label');
  className.forEach((item) => elem.classList.add(item));
  if (text) elem.innerText = text;
  if (attributes) {
    attributes.forEach((item) => elem.setAttribute(item.name, item.value ? item.value : ''));
  }
  return elem;
};

export const createButton = (className: string[], text: string, ...attributes: TagAttributes[]) => {
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
  ...attributes: TagAttributes[]
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
