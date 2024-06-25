import { calculateAge } from '../src/scripts/services/utilities/calculateAge';

test('validate calculating age', () => {
  const age = 23;
  const date = new Date('2001-02-13');
  expect(calculateAge(date)).toStrictEqual(age);
});

test('validate calculating age', () => {
  const age = 22;
  const date = new Date('2001-12-13');
  expect(calculateAge(date)).toStrictEqual(age);
});

test('validate calculating age', () => {
  const age = 32;
  const date = new Date('1992-02-03');
  expect(calculateAge(date)).toStrictEqual(age);
});
