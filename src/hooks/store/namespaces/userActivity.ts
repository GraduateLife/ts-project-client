import { uniqueFunc } from '@/lib/utils';
import {
  CartItem,
  CartItemWithMeta,
  ChosenSpec,
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
  };
};

type Actions = {
  like: (id: string) => void;
  unlike: (id: string) => void;
  setLogin: () => void;
  setAccountId: (id: string) => void;
  setAvatar: (code: string) => void;
  addChosenSpecs: (id: string, chosen: ChosenSpec) => void;
  updateChosenSpecs: (id: string, chosen: ChosenSpec) => void;
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
      },
      setLogin: () => {
        set((state) => {
          state.recorded.isLoggedIn = true;
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
    })),
    {
      name: 'namespace:user_activity',
    }
  )
);
