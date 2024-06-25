import { convertPrice } from '../src/scripts/services/utilities/convertPrice';

test('test converting price', () => {
  expect(convertPrice(2000, 2)).toBe('$20.00');
});
