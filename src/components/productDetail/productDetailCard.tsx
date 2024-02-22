'use client';
import Spacer from '@/theme/typography/spacer';
import Title from '@/theme/typography/title';
import Words from '@/theme/typography/words';
import { Button } from '@/theme/ui/button';
import { CardDescription } from '@/theme/ui/card';

import {
  ChevronLeft,
  ChevronRight,
  Equal,
  Heart,
  Paperclip,
  X,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProductSpecSelectorList from './productSpecSelector';
import { Separator } from '@/theme/ui/separator';
import { Badge } from '@/theme/ui/badge';
import { SpecChoices, transformChosenSpecsToString } from '@/models/product';
import { useStore } from 'zustand';
import { useCurrentProduct } from '@/hooks/store/namespaces/currentProduct';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import {
  listHasThisProduct,
  useCartListStore,
} from '@/hooks/store/namespaces/cartList';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

type ProductDetailCardProp = {
  productId: string;
  productName: string;
  productRate: number;
  productTags: string[];
  productCommented: number;
  productSinglePrice: number;
  productSpecs: SpecChoices[];
};

const ProductHeader = ({
  productName,
  productId,
  productRate,
  productCommented,
  productTags,
}: Pick<
  ProductDetailCardProp,
  | 'productName'
  | 'productId'
  | 'productRate'
  | 'productCommented'
  | 'productTags'
>) => {
  const UserActivityNS = useStore(useUserActivity);
  const [heartIsFilled, setHeartIsFilled] = useState(false);
  const isLiked = useMemo(
    () => UserActivityNS.recorded.likedItemIds.includes(productId),
    [UserActivityNS.recorded.likedItemIds, productId]
  );

  useEffect(() => {
    if (isLiked) {
      setHeartIsFilled(true);
    }
  }, [isLiked]);

  const handleLike = () => {
    if (!isLiked) {
      setHeartIsFilled(true);
      UserActivityNS.like(productId);
    } else {
      setHeartIsFilled(false);
      UserActivityNS.unlike(productId);
    }
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator?.clipboard?.writeText(window.location.href);
    } else {
      alert('Sorry, cannot use your clipboard');
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <CardDescription>{`#${productId}`}</CardDescription>
        <div className="inline-flex space-x-3">
          <Heart
            size={24}
            strokeWidth={1}
            className="cursor-pointer"
            fill={heartIsFilled ? 'red' : 'none'}
            stroke="red"
            onClick={handleLike}
          />
          <Paperclip
            size={24}
            strokeWidth={1}
            className="cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {productTags.map((item, idx) => {
          return (
            <Badge variant={'tag'} key={idx}>
              {item}
            </Badge>
          );
        })}
      </div>

      <Title className="select-all my-0">{productName}</Title>

      <CardDescription>
        rate: {productRate}/5 ({productCommented})
      </CardDescription>
    </>
  );
};

const ProductDetailCard = ({
  productId,
  productName,
  productSinglePrice,
  productRate,
  productCommented,
  productSpecs,
  productTags,
}: ProductDetailCardProp) => {
  const [amount, setAmount] = useState(1);

  const CurrentProductNS = useStore(useCurrentProduct);
  const CartListStoreNS = useStore(useCartListStore);
  const UserActivityNS = useStore(useUserActivity);
  const router = useRouter();

  const handleAmount = (action: 'plus' | 'minus') => {
    switch (action) {
      case 'plus':
        setAmount((a) => {
          return a + 1;
        });
        break;
      case 'minus':
        setAmount((a) => {
          if (a >= 2) return a - 1;
          return a;
        });

      default:
        break;
    }
  };

  const handleAddCart = () => {
    if (!UserActivityNS.recorded.isLoggedIn) {
      alert('must login');
      router.push('/login');
      return;
    }
    //have not chosen specs
    if (
      !UserActivityNS.recorded.chosenSpecsOfItemIds[
        CurrentProductNS.currentProduct.productId
      ]
    ) {
      alert('must choose specs');
      return;
    }

    //cart list has this product
    if (
      listHasThisProduct(
        CartListStoreNS.cartItems,
        CurrentProductNS.currentProduct
      )
    ) {
      //this is the same product with different specs
      //will push into cart list
      if (
        transformChosenSpecsToString(
          UserActivityNS.recorded.chosenSpecsOfItemIds[
            CurrentProductNS.currentProduct.productId
          ]
        ) !==
        transformChosenSpecsToString(
          CartListStoreNS.cartItems.find(
            (item) =>
              item.productId === CurrentProductNS.currentProduct.productId
          )!.productChosenSpec
        )
      ) {
        CartListStoreNS.add(
          { ...CurrentProductNS.currentProduct },
          UserActivityNS.recorded.chosenSpecsOfItemIds[
            CurrentProductNS.currentProduct.productId
          ],
          amount
        );
      }
      //this is a new product
    } else {
      CartListStoreNS.addOrUpdate(
        { ...CurrentProductNS.currentProduct },
        UserActivityNS.recorded.chosenSpecsOfItemIds[
          CurrentProductNS.currentProduct.productId
        ],
        amount
      );
    }
  };

  return (
    <>
      <ProductHeader
        productName={productName}
        productId={productId}
        productRate={productRate}
        productCommented={productCommented}
        productTags={productTags}
      ></ProductHeader>

      <ProductSpecSelectorList specs={productSpecs}></ProductSpecSelectorList>

      <Separator />
      <Words>Choose amount</Words>
      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAmount('minus')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Words>{amount.toString()}</Words>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAmount('plus')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Spacer />
      <Separator />
      <Words>Overall Price:</Words>
      <CardDescription>
        ${productSinglePrice}
        <X className="inline-block w-3 h-3" />
        {amount.toString()}
        <Equal className="inline-block w-3 h-3" />
      </CardDescription>
      <Words className="text-orange-700 font-extrabold text-2xl ">
        ${(productSinglePrice * amount).toString()}
      </Words>
      <Spacer />
      <div className="w-full flex justify-center">
        <Button className="w-[40%]" onClick={handleAddCart}>
          Add to cart
        </Button>
      </div>
    </>
  );
};

export default ProductDetailCard;
