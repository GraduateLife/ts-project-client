import { UserCheckOutAddress } from '@/models/user';
import { Label } from '@/theme/ui/label';
import { RadioGroup, RadioGroupItem } from '@/theme/ui/radio-group';
import React from 'react';

type CheckoutAddressCardProp = {} & UserCheckOutAddress;

const CheckoutAddressCard = ({
  checkoutName,
  checkoutAddress,
  checkoutPhone,
}: CheckoutAddressCardProp) => {
  return (
    <div className="rounded-sm">
      {checkoutName}
      {checkoutAddress}
      {checkoutPhone}
    </div>
  );
};

const CheckoutAddressList = () => {
  return (
    <CheckoutAddressCard
      checkoutName={'cwcwqwq'}
      checkoutAddress={'cewverb'}
      checkoutPhone={'brwber'}
    ></CheckoutAddressCard>
  );
};

export default CheckoutAddressList;
