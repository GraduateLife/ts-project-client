const md5 = require('md5');
export type SpecChoices = {
  specName: string;
  specChoices: string[] | number[];
};

export type ChosenSpec = { specName: string; specValue: string };

export type Product = {
  productId: string;
  productImageUrls: string[];
  productCoverImageUrl: string;
  productName: string;
  productRate: number;
  productTags: string[];
  productViewed: number;
  productSinglePrice: number;
  productSpecs: SpecChoices[];
};

export type CartItem = {
  productChosenSpec: ChosenSpec[];
  productCount: number;
} & Product;

export type CartItemWithMeta = CartItem & {
  uniqueKey: string;
};

export const transformChosenSpecsToString = (cs: ChosenSpec[]) => {
  return cs
    .map((item) => item.specName + '=' + item.specValue)
    .sort()
    .join('&');
};

export const createCartItemUniqueKey = (
  cartItem: Pick<CartItem, 'productId' | 'productChosenSpec'>
) => {
  const msg =
    cartItem.productId +
    transformChosenSpecsToString(cartItem.productChosenSpec);
  return md5(msg);
};
