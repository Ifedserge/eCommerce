import { getProductById } from '../src/scripts/services/utilities/getProductById';
import ProductPage from '../src/scripts/components/views/product/productPage';
import { IProductData } from '../src/scripts/components/types/interfaces';

jest.mock('../src/scripts/services/utilities/getProductById.ts');

const mockGetProductById = getProductById as jest.MockedFunction<typeof getProductById>;

describe('ProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render product page', async () => {
    const mockProductData: IProductData = {
      id: '1',
      description: { 'en-GB': 'Product Description', ru: 'Какой либо текст' },
      masterVariant: {
        images: [{ url: 'https://image.url' }],
        prices: [
          { value: { centAmount: 1000, currencyCode: 'USD', fractionDigits: 1000 }, id: '1' },
        ],
      },
      metaDescription: { 'en-GB': 'Meta descrip', ru: 'Текст' },
      name: { 'en-GB': 'Product Name', ru: 'Тест' },
      slug: { 'en-GB': 'Product slag', ru: 'Тест' },
    };
    mockGetProductById.mockResolvedValue(mockProductData);

    const result = await ProductPage.render();

    expect(mockGetProductById).toHaveBeenCalledWith('test-id');
    expect(result.querySelector('.product-page__img')?.getAttribute('src')).toBe(
      'http://image.url'
    );
    expect(result.querySelector('.product-page__name')?.textContent).toBe('Product Name');
    expect(result.querySelector('.product-page__description')?.textContent).toBe(
      'Prooduct Description'
    );
    expect(result.querySelector('.product-page__price')?.textContent).toBe('USD 10');
  });

  it('missing product', async () => {
    mockGetProductById.mockResolvedValue(null as unknown as IProductData);
    const result = await ProductPage.render();
    expect(mockGetProductById).toHaveBeenCalledWith('test-id');
    expect(result).toBeInstanceOf(HTMLElement);
  });
});
