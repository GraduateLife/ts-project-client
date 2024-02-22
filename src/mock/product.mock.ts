import { IProductFilter, Product } from '@/models/product';
import { faker } from '@faker-js/faker';
import { genNumber, pickOne, picsumUrl } from './constants';

type ParseControllableFields = {
  createPrice?: (...inp: any) => number;
  createRate?: (...inp: any) => number;
  createCommentCount?: (...inp: any) => number;
};

const parseControllableFields = (
  inp: Partial<IProductFilter>
): ParseControllableFields => {
  //@ts-ignore
  let res: ParseControllableFields = {};
  const { MaxPrice, MinPrice, Rate, CommentCount } = inp;
  if (MaxPrice && MinPrice) {
    res.createPrice = () => genNumber(MinPrice, MaxPrice);
  }
  if (Rate) {
    const rate = Rate.map((item) => Number(item));
    res.createRate = () => pickOne(rate);
  }
  if (CommentCount) {
    res.createCommentCount = () => genNumber(CommentCount, 1000);
  }
  return res;
};

let outSideProduct: Product;
export const createOneProduct = (
  givenId?: string,
  filter?: Partial<IProductFilter>
): Product => {
  const urls = new Array(genNumber(2, 7))
    .fill(null)
    .map((item) => picsumUrl(400));

  let creator: Required<ParseControllableFields> = {
    createCommentCount: () => genNumber(1, 5),
    createPrice: () => genNumber(1, 100),
    createRate: () => genNumber(1, 5),
  };
  if (filter) {
    const extraDemand = parseControllableFields(filter);
    creator.createCommentCount =
      extraDemand.createCommentCount ?? creator.createCommentCount;
    creator.createPrice = extraDemand.createPrice ?? creator.createPrice;
    creator.createRate = extraDemand.createRate ?? creator.createRate;
  }
  const willCreateId = givenId ?? faker.string.uuid();
  if (outSideProduct?.productId === willCreateId) {
    return outSideProduct;
  } else {
    outSideProduct = {
      productId: willCreateId,
      productImageUrls: urls,
      productCoverImageUrl: urls[0],
      productName:
        filter?.KeyWord + faker.lorem.words({ min: 5, max: 10 }) ??
        faker.lorem.words({ min: 5, max: 10 }),
      productRate: creator.createRate(),
      productTags: faker.lorem.words({ min: 1, max: 3 }).split(' '),
      productCommented: creator.createCommentCount(),
      productSinglePrice: creator.createPrice(),
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
    return outSideProduct;
  }
};

export const createManyProducts = (
  number: number,
  schema?: Partial<IProductFilter>
): Product[] => {
  return new Array(number).fill(null).map(() => {
    return createOneProduct(undefined, schema);
  });
};
