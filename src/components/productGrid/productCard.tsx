'use client';

import React, { ForwardedRef, Ref, RefAttributes, forwardRef } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/theme/ui/aspect-ratio';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/theme/ui/card';
import { Button } from '@/theme/ui/button';
import { useRouter } from 'next/navigation';
import BaseImage from '../base/baseImage';
import { Product } from '@/models/product';
import Link from 'next/link';
import { Badge } from '@/theme/ui/badge';
import Title from '@/theme/typography/title';
import BaseHoverAble from '../base/baseHoverAble';
import Price from '@/theme/typography/price';
import { Heart } from 'lucide-react';

type ProductCardProp = { refHolder?: any; highLight?: RegExp } & Omit<
  Product,
  'productSpecs'
>;

const ProductCard_ = ({
  productId,
  productCoverImageUrl,
  productImageUrls,
  productName,
  productTags,
  productCommented,
  productSinglePrice,
  productRate,
  refHolder = undefined,
  highLight,
}: ProductCardProp) => {
  return (
    <Card
      className="min-h-[510px] w-full hover:border-orange-300 hover:border-2 m-2 dark:hover:border-orange-900 dark:hover:border-2"
      ref={refHolder}
    >
      <CardHeader className="py-1 px-2">
        <BaseHoverAble content={productName}>
          <Link href={`/products/${productId}`}>
            <Title className="my-2 text-left hover:underline line-clamp-2">
              {productName}
            </Title>
          </Link>
        </BaseHoverAble>
        <CardDescription className="px-1">
          rate: {productRate}/5 by {productCommented} people
        </CardDescription>
      </CardHeader>
      <CardContent className="my-2">
        <BaseImage
          src={productCoverImageUrl ?? productImageUrls[0]}
          width={200}
          height={200}
          alt={productName}
          className="w-full"
          onClick={() =>
            window.open(productCoverImageUrl ?? productImageUrls[0])
          }
        ></BaseImage>
        <div className="max-h-[48px]">
          {productTags.map((item, idx) => {
            return (
              <Badge variant={'tag'} key={idx} className="mt-2">
                {item}
              </Badge>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Price>${productSinglePrice}</Price>
        <Button variant={'link'} asChild className="text-lg">
          <Link href={`/products/${productId}`}>View more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductCard = forwardRef((prop: ProductCardProp, ref) => {
  return <ProductCard_ {...prop} refHolder={ref} />;
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
