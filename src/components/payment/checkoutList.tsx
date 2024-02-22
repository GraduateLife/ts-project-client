'use client';
import { useCartListStore } from '@/hooks/store/namespaces/cartList';
import { CartItem } from '@/models/product';
import { use } from 'marked';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useStore } from 'zustand';
import BaseHoverAble from '../base/baseHoverAble';
import BaseImage from '../base/baseImage';
import { Equal, X } from 'lucide-react';
import Link from 'next/link';
import Price from '@/theme/typography/price';
import Words from '@/theme/typography/words';
import Title from '@/theme/typography/title';
import { Separator } from '@/theme/ui/separator';
import { capitalize, isNil, round } from 'lodash';
import { useCheckoutStore } from '@/hooks/store/namespaces/checkout';

type CheckoutLiProp = {} & Pick<
  CartItem,
  | 'productChosenSpec'
  | 'productCount'
  | 'productId'
  | 'productCoverImageUrl'
  | 'productImageUrls'
  | 'productName'
  | 'productSinglePrice'
>;

const CheckoutLi = ({
  productChosenSpec,
  productCount,
  productId,
  productCoverImageUrl,
  productName,
  productSinglePrice,
  productImageUrls,
}: CheckoutLiProp) => {
  return (
    <div className="flex justify-between items-center max-w-[400px]">
      <div className="w-[fit-content]">
        <BaseHoverAble
          side="left"
          content={
            <div>
              <BaseImage
                src={productCoverImageUrl ?? productImageUrls[0]}
                alt={productName}
                width={150}
                height={150}
              ></BaseImage>
              <Words> You chose:</Words>
              {productChosenSpec.map((item, idx) => {
                return (
                  <div key={idx}>{item.specName + ':' + item.specValue}</div>
                );
              })}
              <Words>
                Single Price: <Price>{'$' + productSinglePrice}</Price>
              </Words>
            </div>
          }
        >
          <Link href={`/products/${productId}`}>
            <span className="hover:underline">{productName}</span>
          </Link>
        </BaseHoverAble>
      </div>
      <div>
        <X className="inline-block h-3 w-3 "></X>
        {productCount}
        <Equal className="inline-block h-3 w-3 mr-1"></Equal>
        <Price>{'$' + productCount * productSinglePrice}</Price>
      </div>
    </div>
  );
};

const CheckoutList = () => {
  const CartListStoreNS = useStore(useCartListStore);
  const CheckoutNS = useStore(useCheckoutStore);

  const subTotal = useMemo(() => {
    return CartListStoreNS.cartItems
      .map(({ productCount, productSinglePrice }) => {
        return productCount * productSinglePrice;
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
  }, [CartListStoreNS.cartItems]);

  useEffect(() => {
    CheckoutNS.start(subTotal);
  }, []);

  return (
    <div className="min-w-[500px]">
      <Title> You have picked:</Title>
      {CartListStoreNS.cartItems.map(
        ({
          productId,
          productChosenSpec,
          productCount,
          productName,
          productImageUrls,
          productCoverImageUrl,
          productSinglePrice,
          uniqueKey,
        }) => {
          return (
            <CheckoutLi
              key={productId}
              productChosenSpec={productChosenSpec}
              productCount={productCount}
              productId={productId}
              productImageUrls={productImageUrls}
              productCoverImageUrl={productCoverImageUrl}
              productName={productName}
              productSinglePrice={productSinglePrice}
            ></CheckoutLi>
          );
        }
      )}
      <Title>SubTotal: ${subTotal}</Title>
    </div>
  );
};

export default CheckoutList;
