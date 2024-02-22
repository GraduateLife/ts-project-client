const md5 = require('md5');
import * as z from 'zod';
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
  productCommented: number;
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

const stringToNumberSchema = () => z.string().transform(Number);
const safePreprocessor =
  <O, Z extends z.ZodType<O>>(preprocessorSchema: Z, fallback: any) =>
  (val: unknown): O | null => {
    const parsed = preprocessorSchema.safeParse(val);
    if (!parsed.success) {
      return fallback;
    }
    return parsed.data;
  };

export const productFilterFormSchema = z
  .object({
    //a range picker
    MinPrice: z.preprocess(
      safePreprocessor(stringToNumberSchema(), 1),
      z.number().min(1)
    ),
    MaxPrice: z.preprocess(
      safePreprocessor(stringToNumberSchema(), 2),
      z.number().max(1_000_000)
    ),

    Rate: z.array(z.string()),
    //a slider
    CommentCount: z.number(),

    KeyWord: z.string().optional(),
  })
  .refine(({ MaxPrice, MinPrice }) => MaxPrice > MinPrice, {
    message: 'max price must higher than min price',
    path: ['MaxPrice'], // path of error
  });
export type IProductFilter = z.infer<typeof productFilterFormSchema>;

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
