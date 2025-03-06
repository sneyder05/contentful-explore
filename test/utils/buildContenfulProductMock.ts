import { faker } from '@faker-js/faker';
import { ContentfulProduct } from '../../src/core/contentful/types/ContentProductSkeleton';

export function buildContenfulProductMock(defaultValues?: Partial<ContentfulProduct>): ContentfulProduct {
  return {
    fields: {
      sku: faker.string.alphanumeric(6),
      name: faker.commerce.productName(),
      brand: faker.company.name(),
      model: faker.word.sample(),
      category: faker.word.sample(),
      price: faker.number.int({ min: 1, max: 100 }),
      currency: faker.finance.currencyCode(),
      stock: faker.number.int({ min: 1, max: 100 }),
      ...defaultValues?.fields,
    },
  } as ContentfulProduct;
}
