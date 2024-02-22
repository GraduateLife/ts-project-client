import {
  asMoneyFormat,
  useCheckoutStore,
} from '@/hooks/store/namespaces/checkout';
import Words from '@/theme/typography/words';
import { Separator } from '@/theme/ui/separator';
import { capitalize, isNumber } from 'lodash';
import { memo, useEffect } from 'react';

import { useStore } from 'zustand';

export type OtherMoney = {
  name: string;
  type?: '-' | '+';
  desc?: string;
  amount: number | string;
};

const isPercentage = (amount: number | string) => {
  if (isNumber(amount)) return false;
  if (amount.endsWith('%')) return true;
  return false;
};
// const AsMoneyFormat = (input: string | number, withSign = false) => {
//   const sign = Number(input) >= 0 ? '+' : '-';
//   const _sign = withSign ? sign : '';
//   return _sign + '$' + Math.abs(Number(input));
// };

const OtherMoneyLi_ = ({ type = '+', name, amount, desc }: OtherMoney) => {
  const CheckoutNS = useStore(useCheckoutStore);
  useEffect(() => {
    type === '+'
      ? CheckoutNS.addExtra(amount, name)
      : CheckoutNS.subtractExtra(amount, name);
  }, []);
  return (
    <div className="flex justify-between items-center">
      <Words>{`${name}${desc ? `(${desc})` : ''}:`}</Words>
      {isPercentage(amount) ? (
        <Words> {type + amount}</Words>
      ) : (
        <Words> {type + asMoneyFormat(amount)}</Words>
      )}
    </div>
  );
};

const OtherMoneyLi = memo(OtherMoneyLi_);

const OtherMoneyList = () => {
  const CheckoutNS = useStore(useCheckoutStore);
  useEffect(() => {
    CheckoutNS.registerOtherMoney({ name: 'Tax', amount: '10%' });
    CheckoutNS.registerOtherMoney({ name: 'Shipping', amount: 3 });
  });

  return (
    <>
      <Separator />
      {CheckoutNS.detail.data.map((item, idx) => {
        return (
          <OtherMoneyLi
            key={item.name}
            name={item.name}
            amount={item.amount}
            type={item.type ?? '+'}
          ></OtherMoneyLi>
        );
      })}
      <Separator />
      <div className="flex justify-between items-center">
        <Words>Extra payment</Words>
        <Words>
          {asMoneyFormat(CheckoutNS.base.after - CheckoutNS.base.before, true)}
        </Words>
      </div>
    </>
  );
};

export default OtherMoneyList;
