import { Product } from '@/models/product';
import { faker } from '@faker-js/faker';
import { genNumber, ipsumUrl } from './constants';
export const createOneProduct = (givenId?: string): Product => {
  const urls = new Array(genNumber(2, 7))
    .fill(null)
    .map((item) => ipsumUrl(400));
  return {
    productId: givenId ?? faker.string.uuid(),
    productImageUrls: urls,
    productCoverImageUrl: urls[0],
    productName: faker.lorem.words({ min: 5, max: 10 }),
    productRate: genNumber(1, 5),
    productTags: faker.lorem.words({ min: 1, max: 3 }).split(' '),
    productViewed: genNumber(1, 1000),
    productSinglePrice: genNumber(1, 100),
    productSpecs: [
      {
        specName: faker.lorem.word(),
        specChoices: faker.lorem.words({ min: 1, max: 3 }).split(' '),
      },
      {
        specName: faker.lorem.word(),
        specChoices: faker.lorem.words({ min: 1, max: 3 }).split(' '),
      },
    ],
  };
};

export const createManyProducts = (number: number): Product[] => {
  return new Array(number).fill(null).map(() => {
    return createOneProduct();
  });
};
