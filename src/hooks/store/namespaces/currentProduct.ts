import { Product } from '@/models/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = { currentProduct: Product };
type Actions = {
  register: (data: Product) => void;
  unset: () => void;
};

const initialState = {
  productId: '',
  productImageUrls: [] as string[],
  productCoverImageUrl: '',
  productName: '',
  productRate: 0,
  productTags: [] as string[],
  productViewed: 0,
  productSinglePrice: 0,
  productSpecs: [],
};

export const useCurrentProduct = create<State & Actions>()(
  persist(
    immer((set) => ({
      currentProduct: { ...initialState },
      register: (data: Product) => {
        set((state) => {
          state.currentProduct = data;
        });
      },
      unset: () => {
        set((state) => {
          state.currentProduct = { ...initialState };
        });
      },
    })),
    {
      name: 'namespace:current-product',
    }
  )
);
