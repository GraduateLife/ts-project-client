import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Decimal from 'decimal.js';
import { OtherMoney } from '@/components/payment/checkoutOtherMoney';
import _ from 'lodash';

type State = {
  base: {
    before: number;
    after: number;
  };
  detail: {
    data: (OtherMoney & { operated: boolean })[];
  };
};

type Actions = {
  start: (amount: number) => void;
  addExtra: (e: number | string, itemName?: string) => void;
  subtractExtra: (e: number | string, itemName?: string) => void;
  registerOtherMoney: (e: OtherMoney) => void;
};

const itemIsOperated = (
  src: (OtherMoney & { operated: boolean })[],
  itemName: string
) => {
  const names = src.map((item) => item.name);
  if (!names.includes(itemName)) {
    return false;
  }
  const foundItem = src.find((item) => item.name === itemName);
  return foundItem?.operated === true;
};

export const useCheckoutStore = create<State & Actions>()(
  immer((set) => ({
    base: {
      before: 0,
      after: 0,
    },
    detail: {
      data: [],
    },
    start: (amount) => {
      set((state) => {
        state.base.before = amount;
        state.base.after = amount;
      });
    },

    addExtra: (input, itemName) =>
      set((state) => {
        if (itemName && itemIsOperated(state.detail.data, itemName)) {
          return;
        }
        const x = state.base.after;
        let _y: number;
        if (typeof input === 'number') {
          _y = input;
          state.base.after = state.base.after + input;
        } else if (typeof input === 'string') {
          _y = convertPercentageToNumber(input) + 1;
          state.base.after = MoneyCalculate.multiply(x, _y);
        }
        state.detail.data.forEach((item) => {
          if (item.name === itemName) {
            item.operated = true;
          }
        });
      }),
    subtractExtra: (input, itemName) =>
      set((state) => {
        if (itemName && itemIsOperated(state.detail.data, itemName)) {
          return;
        }
        if (typeof input === 'number') {
          state.base.after = state.base.after - input;
        } else if (typeof input === 'string') {
          const per = convertPercentageToNumber(input);
          state.base.after = (1 - per) * state.base.after;
        }
        state.detail.data.forEach((item) => {
          if (item.name === itemName) {
            item.operated = true;
          }
        });
      }),
    registerOtherMoney(e) {
      set((state) => {
        const names = state.detail.data.map((item) => item.name);
        if (!names.includes(e.name)) {
          state.detail.data = [...state.detail.data, { ...e, operated: false }];
        }
      });
    },
  }))
);

const convertPercentageToNumber = (input: string) => {
  if (!input.endsWith('%')) {
    throw new Error(
      'nonsense input from convertPercentageToNumber,must end with %'
    );
  }
  const digits = /^\d*/.exec(input);
  if (!digits)
    throw new Error(
      'nonsense input from convertPercentageToNumber,must be valid percentage format'
    );
  const nDigits = Number(digits);
  if (nDigits > 100)
    throw new Error(
      'nonsense input from convertPercentageToNumber,must be less than or equal 100%'
    );
  return nDigits / 100;
};

class MoneyCalculate {
  static D = Decimal.clone({ precision: 9, rounding: 2 });
  static plus(x: number, y: number) {
    const _x = new MoneyCalculate.D(x);
    const _y = new MoneyCalculate.D(y);
    const res = _x.plus(_y);
    return res.toDP(2).toNumber();
  }
  static minus(x: number, y: number) {}
  static multiply(x: number, y: number) {
    const _x = new MoneyCalculate.D(x);
    const _y = new MoneyCalculate.D(y);
    const res = _x.mul(_y);
    return res.toDP(2).toNumber();
  }
  static divide(x: number, y: number) {}
}

export const asMoneyFormat = (
  input: string | number,
  withSign = false,
  preserveNegative = false
) => {
  if (typeof input === 'string') {
    input = Number(input);
  }
  let _input = MoneyCalculate.plus(input, 0);
  if (preserveNegative && _input < 0) {
    _input = 0;
  }
  const sign = Number(input) >= 0 ? '+' : '-';
  const _sign = withSign ? sign : '';
  return _sign + '$' + Math.abs(_input);
};
