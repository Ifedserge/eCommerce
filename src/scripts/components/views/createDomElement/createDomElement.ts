import { ElementParams } from '../../types/elementParams';

function createDomElement({
  elemType,
  classNames,
  atributes,
  textContent,
}: ElementParams): HTMLElement | HTMLButtonElement | HTMLInputElement {
  const element = document.createElement(elemType);
  classNames.forEach((className) => {
    element.classList.add(className);
  });
  if (atributes) {
    Object.keys(atributes).forEach((key) => {
      element.setAttribute(key, atributes[key]);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

export default createDomElement;
