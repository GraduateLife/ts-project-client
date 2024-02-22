import { create, useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  count: number[];
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

export const useCountStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      count: [],
      increment: (qty: number) =>
        set((state) => {
          state.count.push(qty);
        }),
      decrement: (qty: number) =>
        set((state) => {
          state.count.pop();
        }),
    })),
    {
      name: 'food-storage',
    }
  )
);
