'use client';
import Dot from '@/theme/typography/dot';
import Emphasis from '@/theme/typography/emphasis';
import { Button } from '@/theme/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
  Sheet,
} from '@/theme/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import ShoppingCartList from './shoppingCartList';
import { useStore } from 'zustand';
import { useCartListStore } from '@/hooks/store/namespaces/cartList';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useRouter } from 'next/navigation';
import { prepareStripeClient } from '@/lib/stripe';
import { _fetch } from '@/fetchers';

const ShoppingCartDrawer = () => {
  const CartListNS = useStore(useCartListStore);
  const UserActivityNS = useStore(useUserActivity);
  const router = useRouter();
  const handlePay = async () => {
    // router.push('/payment');
    // return;
    const stripe = await prepareStripeClient();
    const res = await fetch('/api/checkout', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(CartListNS.cartItems),
    });
    const { sessionId } = await res.json();
    stripe && stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className="relative">
          {CartListNS.cartItems.length > 0 && (
            <p className="text-orange-400 absolute top-0 right-0">
              {CartListNS.cartItems.length}
            </p>
          )}
          <ShoppingCart className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            You have {CartListNS.cartItems.length} item(s) in your shopping cart
          </SheetTitle>
          <SheetDescription>
            Edit your shopping cart. Click{' '}
            <Emphasis className="uppercase">ok</Emphasis> or click outside to
            leave, else click <Emphasis className="uppercase">pay</Emphasis> to
            go to checkout page
          </SheetDescription>
        </SheetHeader>
        <ShoppingCartList />
        <SheetFooter>
          <div className=" w-[80%] mx-auto flex justify-between items-center">
            <Button
              type="submit"
              onClick={handlePay}
              disabled={CartListNS.cartItems.length === 0}
            >
              Pay
            </Button>
            <SheetClose asChild>
              <Button type="submit">OK</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartDrawer;
