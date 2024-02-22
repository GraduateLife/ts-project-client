'use client';

import { useCartListStore } from '@/hooks/store/namespaces/cartList';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';

const PaymentPage = () => {
  const qs = useSearchParams();
  const CartListStoreNS = useStore(useCartListStore);
  const [status, setStatus] = useState('default');
  useEffect(() => {
    const st = qs.get('status');
    setStatus((_old) => {
      if (st) return st;
      return 'accident';
    });
    if (st === 'success') {
      CartListStoreNS.unset();
    }
  }, []);

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      {status === 'success' && <>Well done!</>}
      {status === 'cancel' && <>This payment has been cancelled</>}
      {status === 'accident' && (
        <>Cannot get payment result, please contact admin</>
      )}
      {status === 'default' && <>Querying payment status...</>}
    </div>
  );
};

export default PaymentPage;
