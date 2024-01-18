import {
  CartItem,
  CartItemWithMeta,
  ChosenSpec,
  Product,
  createCartItemUniqueKey,
  transformChosenSpecsToString,
} from '@/models/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = { cartItems: CartItemWithMeta[] };
type Actions = {
  addOrUpdate: (p: Product, s: ChosenSpec[], amount: number) => void;
  add: (p: Product, s: ChosenSpec[], amount: number) => void;
  remove: (uniqueKey: string) => void;
  updateByKey: (key: string, cb: (c: CartItem) => void) => void;
};

const initialState: CartItemWithMeta[] = [];

export const listHasThisProduct = (from: CartItem[], toFind: Product) => {
  if (from.map((item) => item.productId).includes(toFind.productId)) {
    return toFind.productId;
  }
  return false;
};

export const listHasThisCartItem = (
  from: CartItemWithMeta[],
  target: CartItem
) => {
  const targetUniqueKey = createCartItemUniqueKey(target);
  const res = from.find((item) => {
    return item.uniqueKey === targetUniqueKey;
  });
  if (!res) return false;
  return targetUniqueKey;
};

export const useCartListStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      cartItems: initialState,
      /**
       * @remark if list has this product, update it
       * @remark if list does not have this product,append
       */
      addOrUpdate: (
        productToAdd: Product,
        withSpecs: ChosenSpec[],
        withAmount: number
      ) =>
        set((state) => {
          const canFind = listHasThisProduct(state.cartItems, productToAdd);
          if (canFind) {
            const found = state.cartItems.find(
              (item) => item.productId === canFind
            )!;
            found.productCount = withAmount;
            found.productChosenSpec = withSpecs;
          } else {
            state.cartItems.push({
              ...productToAdd,
              productChosenSpec: withSpecs,
              productCount: withAmount,
              uniqueKey: createCartItemUniqueKey({
                ...productToAdd,
                productChosenSpec: withSpecs,
              }),
            });
          }
        }),
      /**
       * @remark directly append this product without any checks
       */
      add: (
        productToAdd: Product,
        withSpecs: ChosenSpec[],
        withAmount: number
      ) =>
        set((state) => {
          state.cartItems.push({
            ...productToAdd,
            productChosenSpec: withSpecs,
            productCount: withAmount,
            uniqueKey: createCartItemUniqueKey({
              ...productToAdd,
              productChosenSpec: withSpecs,
            }),
          });
        }),
      remove: (cartItemUniqueKey: string) =>
        set((state) => {
          state.cartItems = state.cartItems.filter(
            (item) => item.uniqueKey !== cartItemUniqueKey
          );
        }),
      updateByKey: (cartItemUniqueKey, cb) => {
        set((state) => {
          state.cartItems.forEach((item) => {
            if (item.uniqueKey === cartItemUniqueKey) {
              cb(item);
            }
          });
        });
      },
    })),

    {
      name: 'namespace:cart_items',
    }
  )
);
