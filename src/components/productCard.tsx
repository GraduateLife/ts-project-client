'use client';

import React from 'react';
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
import BaseImage from './base/baseImage';
import { Product } from '@/models/product';
import Link from 'next/link';
import { Badge } from '@/theme/ui/badge';

type ProductCardProp = {} & Omit<Product, 'productSpecs'>;

const ProductCard = ({
  productId,
  productCoverImageUrl,
  productImageUrls,
  productName,
  productTags,
  productViewed,
  productSinglePrice,
  productRate,
}: ProductCardProp) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products/123');
  };
  return (
    // <div className="flex flex-col min-h-[400px] w-full border rounded-md">
    //   <h3 className="my-2 px-4 font-bold capitalize">prody</h3>
    //
    //   StarRating
    //   <h1>add to cart</h1>
    // </div>
    <Card className="min-h-[400px] w-full">
      <CardHeader>
        <CardTitle>{productName}</CardTitle>
        <CardDescription>
          rate: {productRate}/5 by {productViewed} people
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseImage
          src={productCoverImageUrl ?? productImageUrls[0]}
        ></BaseImage>
        {productTags.map((item, idx) => {
          return <Badge key={idx}>{item}</Badge>;
        })}
        <div className="text-right">${productSinglePrice}</div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end items-center">
        <Button variant={'link'} className=" text-lg" onClick={handleClick}>
          <Link href={`/products/${productId}`}></Link>
          View more
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
