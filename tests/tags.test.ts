import { BlockType, HeadingType, InputType } from '../src/scripts/components/types/enums';
import {
  createBlock,
  createButton,
  createForm,
  createHeading,
  createImg,
  createInput,
  createLabel,
  createLink,
  createP,
  createSelect,
} from '../src/scripts/services/utilities/tags';

test('creating div block', () => {
  const result = document.createElement('div');
  const class1 = 'tst1';
  const class2 = 'tst2';
  result.classList.add(class1, class2);
  expect(createBlock(BlockType.div, [class1, class2])).toStrictEqual(result);
});

test('creating input', () => {
  const result = document.createElement('input');
  result.type = 'text';
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const attributes = [{ name: 'name', value: 'fuck!' }, { name: 'disabled' }];
  attributes.forEach((item) => result.setAttribute(item.name, item.value ? item.value : ''));
  expect(createInput(InputType.text, classes, ...attributes)).toStrictEqual(result);
});

test('creating form', () => {
  const result = document.createElement('form');
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const attributes = [
    { name: 'action', value: 'fuck!' },
    { name: 'name', value: 'name' },
  ];
  attributes.forEach((item) => result.setAttribute(item.name, item.value ? item.value : ''));
  expect(createForm(classes, ...attributes)).toStrictEqual(result);
});

test('creating label', () => {
  const result = document.createElement('label');
  result.innerText = 'test';
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const attributes = [{ name: 'for', value: 'test case' }];
  attributes.forEach((item) => result.setAttribute(item.name, item.value ? item.value : ''));
  expect(createLabel(classes, 'test', ...attributes)).toStrictEqual(result);
});

test('creating button', () => {
  const result = document.createElement('button');
  result.innerText = 'test';
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const attributes = [{ name: 'disabled', value: 'true' }];
  attributes.forEach((item) => result.setAttribute(item.name, item.value ? item.value : ''));
  expect(createButton(classes, 'test', ...attributes)).toStrictEqual(result);
});

test('creating p tag', () => {
  const result = document.createElement('p');
  result.innerText = 'test';
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  expect(createP(classes, 'test')).toStrictEqual(result);
});

test('creating h tag', () => {
  const result = document.createElement('h1');
  result.innerText = 'test';
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  expect(createHeading(classes, 'test', HeadingType.h1)).toStrictEqual(result);
});

test('creating link', () => {
  const result = document.createElement('a');
  result.append('test');
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const attributes = [{ name: 'href', value: '192.168.0.1' }];
  attributes.forEach((item) => result.setAttribute(item.name, item.value ? item.value : ''));
  expect(createLink(classes, '192.168.0.1', 'test')).toStrictEqual(result);
});

test('creating select', () => {
  const result = document.createElement('select');
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  const options = ['first', 'second', 'third'];
  options.forEach((option) => {
    const optionElem = document.createElement('option');
    optionElem.value = option;
    optionElem.textContent = option;
    result.appendChild(optionElem);
  });
  expect(createSelect(options, classes)).toStrictEqual(result);
});

test('creating img tag', () => {
  const result = document.createElement('img');
  const classes = ['tst1', 'tst2'];
  classes.forEach((item) => result.classList.add(item));
  result.src = '../test/test.test';
  result.alt = 'test';
  result.setAttribute('height', '228px');
  result.setAttribute('width', '322px');
  expect(createImg(classes, '../test/test.test', 'test', 228, 322)).toStrictEqual(result);
});
