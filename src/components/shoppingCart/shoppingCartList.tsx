import React, { Fragment, useCallback, useMemo } from 'react';
import BaseImage from '../base/baseImage';
import { picsumUrl } from '@/mock/constants';
import Words from '@/theme/typography/words';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Equal,
  Heart,
  PackageOpen,
  X,
} from 'lucide-react';
import { Separator } from '@/theme/ui/separator';
import { useStore } from 'zustand';
import { Button } from '@/theme/ui/button';
import { useCartListStore } from '@/hooks/store/namespaces/cartList';
import { isEmpty } from 'lodash';
import {
  CartItem,
  ChosenSpec,
  createCartItemUniqueKey,
} from '@/models/product';
import { useRouter } from 'next/navigation';

type ShoppingCartLiProp = {
  productImageUrl: string;
  productId: string;
  productName: string;
  productChosenSpec: ChosenSpec[];
  productSinglePrice: number;
  productCount: number;
};

const ShoppingCartLi = ({
  productImageUrl,
  productId,
  productName,
  productSinglePrice,
  productChosenSpec,
  productCount,
}: ShoppingCartLiProp) => {
  const CartListNS = useStore(useCartListStore);
  const thisCartItemUniqueKey = useMemo(
    () => createCartItemUniqueKey({ productId, productChosenSpec }),
    [productChosenSpec, productId]
  );
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/products/' + productId);
  };

  const handleRemove = useCallback(() => {
    CartListNS.remove(thisCartItemUniqueKey);
  }, [CartListNS, thisCartItemUniqueKey]);

  const handleAmount = (action: 'plus' | 'minus') => {
    switch (action) {
      case 'plus':
        CartListNS.updateByKey(thisCartItemUniqueKey, (item: CartItem) => {
          item.productCount++;
        });
        break;
      case 'minus':
        if (productCount > 1) {
          CartListNS.updateByKey(thisCartItemUniqueKey, (item: CartItem) => {
            item.productCount--;
          });
        } else {
          CartListNS.remove(thisCartItemUniqueKey);
        }

      default:
        break;
    }
  };

  const handleArchive = useCallback(() => {
    console.log('ok');
  }, []);

  return (
    <>
      <div className="flex items-center justify-evenly relative">
        <div className="min-h-[3.125rem] min-w-[3.125rem] relative">
          <BaseImage
            src={productImageUrl}
            alt={productName}
            width={50}
            height={50}
          ></BaseImage>
        </div>
        <div className="pl-2 max-w-[300px]">
          <div className="max-h-[50px]" onClick={handleNavigate}>
            <Words className="inline-block text-ellipsis overflow-hidden cursor-pointer">
              {productName.substring(0, 10)}
              {'... '}
              <X className="inline-block h-3 w-3"></X>
              {productCount}
            </Words>
          </div>

          <div className="flex flex-wrap text-sky-700">
            {productChosenSpec.map((item, idx) => {
              return (
                <div
                  key={item.specValue + item.specName}
                  className="px-2 truncate"
                >
                  <span className="hover:underline hover:decoration-sky-500/30 text-ellipsis overflow-hidden ">
                    {item.specName} : {item.specValue}
                  </span>
                </div>
              );
            })}
          </div>
          <Words className="text-red-600">
            Overall: {productSinglePrice}
            <X className="inline-block h-4 w-4"></X>
            {productCount}
            <Equal className="inline-block h-4 w-4"></Equal>
            {productSinglePrice * productCount}
          </Words>
        </div>
        <span className="absolute top-1 right-0 inline-flex space-x-1  transition-opacity ease-in-out">
          <ChevronLeft
            className="cursor-pointer opacity-20 hover:opacity-100"
            onClick={() => handleAmount('minus')}
          ></ChevronLeft>
          <ChevronRight
            className="cursor-pointer opacity-20 hover:opacity-100"
            onClick={() => handleAmount('plus')}
          ></ChevronRight>
          <PackageOpen
            stroke="orange"
            className="cursor-pointer opacity-20 hover:opacity-100"
            onClick={handleArchive}
          />

          <X
            className="cursor-pointer opacity-20 hover:opacity-100 text-red-500"
            onClick={handleRemove}
          ></X>
        </span>
      </div>
    </>
  );
};

const ShoppingCartList = () => {
  const CartListNS = useStore(useCartListStore);

  return (
    <ul className="py-2">
      {CartListNS.cartItems.map((item, idx) => {
        return (
          <Fragment key={item.uniqueKey}>
            <Separator />
            <ShoppingCartLi
              productId={item.productId}
              productImageUrl={item.productCoverImageUrl}
              productName={item.productName}
              productSinglePrice={item.productSinglePrice}
              productCount={item.productCount}
              productChosenSpec={item.productChosenSpec}
            />
            {idx === CartListNS.cartItems.length - 1 ? <Separator /> : null}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default ShoppingCartList;
