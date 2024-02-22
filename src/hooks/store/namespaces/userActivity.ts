import {
  CartItem,
  CartItemWithMeta,
  ChosenSpec,
  IProductFilter,
  Product,
} from '@/models/product';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  recorded: {
    accountId: string;
    avatarCode: string;
    isLoggedIn: boolean;
    likedItemIds: string[];
    archivedCartItems: CartItemWithMeta[];
    chosenSpecsOfItemIds: Record<string, ChosenSpec[]>;
    selectedProductFilter: IProductFilter;
  };
};

type Actions = {
  like: (id: string) => void;
  unlike: (id: string) => void;
  setLogin: (loginState?: boolean) => void;
  setAccountId: (id: string) => void;
  setAvatar: (code: string) => void;
  addChosenSpecs: (id: string, chosen: ChosenSpec) => void;
  updateChosenSpecs: (id: string, chosen: ChosenSpec) => void;
  updateProductFilter: (schema: IProductFilter) => void;
  filterUnset: () => void;
};

const filterInitial = {
  MinPrice: 1,
  MaxPrice: 1000,
  CommentCount: 0,
  Rate: ['1', '2', '3', '4', '5'],
  Keyword: undefined,
};

export const useUserActivity = create<State & Actions>()(
  persist(
    immer((set) => ({
      recorded: {
        avatarCode: '',
        accountId: '',
        isLoggedIn: false,
        likedItemIds: [],
        archivedCartItems: [],
        chosenSpecsOfItemIds: {},
        selectedProductFilter: filterInitial,
      },
      filterUnset: () => {
        set((state) => {
          state.recorded.selectedProductFilter = filterInitial;
        });
      },
      setLogin: (loginState = true) => {
        set((state) => {
          state.recorded.isLoggedIn = loginState;
        });
      },
      setAvatar: (code) => {
        set((state) => {
          state.recorded.avatarCode = code;
        });
      },
      setAccountId: (id) => {
        set((state) => {
          state.recorded.accountId = id;
        });
      },
      like: (productId: string) => {
        set((state) => {
          if (state.recorded.likedItemIds.includes(productId)) return;
          state.recorded.likedItemIds.push(productId);
        });
      },
      unlike: (productId: string) => {
        set((state) => {
          if (!state.recorded.likedItemIds.includes(productId)) return;
          state.recorded.likedItemIds = state.recorded.likedItemIds.filter(
            (item) => {
              return item !== productId;
            }
          );
        });
      },
      archive: (item: CartItemWithMeta) => {
        set((state) => {
          state.recorded.archivedCartItems.push(item);
        });
      },

      addChosenSpecs: (productId, chosenSpec) => {
        set((state) => {
          if (!state.recorded.chosenSpecsOfItemIds[productId]) {
            state.recorded.chosenSpecsOfItemIds[productId] = [];
          }
          state.recorded.chosenSpecsOfItemIds[productId].push(chosenSpec);
        });
      },
      updateChosenSpecs: (productId, chosenSpec) => {
        set((state) => {
          state.recorded.chosenSpecsOfItemIds[productId].forEach((item) => {
            if (item.specName === chosenSpec.specName) {
              item.specValue = chosenSpec.specValue;
            }
          });
        });
      },
      updateProductFilter: (schema) => {
        set((state) => {
          for (const [_k, _v] of Object.entries(schema)) {
            //@ts-ignore
            state.recorded.selectedProductFilter[_k] = _v;
          }
        });
      },
    })),
    {
      name: 'namespace:user_activity',
    }
  )
);
