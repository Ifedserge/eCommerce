// import { getProductById } from '../src/scripts/services/utilities/getProductById';
// import ProductPage from '../src/scripts/components/views/product/productPage';
// import { IProductData } from '../src/scripts/components/types/interfaces';

// jest.mock('../src/scripts/services/utilities/getProductById.ts');

// const mockGetProductById = getProductById as jest.MockedFunction<typeof getProductById>;

// describe('ProductPage', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     Object.defineProperty(window, 'location', {
//       writable: true,
//       value: {
//         pathname: '/product/test-id',
//       },
//     });
//   });

//   it('render product page', async () => {
//     const mockProductData: IProductData = {
//       id: '1',
//       description: { 'en-GB': 'Product Description', ru: 'Какой либо текст' },
//       masterVariant: {
//         images: [{ url: 'https://image.url' }],
//         prices: [{ value: { centAmount: 1000, currencyCode: 'USD', fractionDigits: 2 }, id: '1' }],
//         id: 0,
//         sku: 'string'
//       },
//       metaDescription: { 'en-GB': 'Meta descrip', ru: 'Текст' },
//       name: { 'en-GB': 'Product Name', ru: 'Тест' },
//       slug: { 'en-GB': 'Product slag', ru: 'Тест' },
//     };
//     mockGetProductById.mockResolvedValue(mockProductData);

//     const result = await ProductPage.render();

//     expect(mockGetProductById).toHaveBeenCalledWith('test-id');
//     const imgElement = result.querySelector('.slider__img');

//     expect(imgElement?.getAttribute('src')).toBe('https://image.url');
//     expect(result.querySelector('.product-page__name')?.textContent).toBe('');
//     expect(result.querySelector('.product-page__description')?.textContent).toBe(
//       'Product Description'
//     );
//     expect(result.querySelector('.product-page__price')?.textContent).toBe('');
//   });

//   it('missing product', async () => {
//     mockGetProductById.mockResolvedValue(null as unknown as IProductData);
//     const result = await ProductPage.render();
//     expect(mockGetProductById).toHaveBeenCalledWith('test-id');
//     expect(result).toBeInstanceOf(HTMLElement);
//   });
// });
