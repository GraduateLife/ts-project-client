'use client';
import React, { useEffect } from 'react';
import ProductCarousel from './productCarousel';
import ProductDetailCard from './productDetailCard';
import { Product } from '@/models/product';
import { useCurrentProduct } from '@/hooks/store/namespaces/currentProduct';
import { useStore } from 'zustand';

const ProductDetailDisplay = ({
  productId,
  productImageUrls,
  productCoverImageUrl,
  productName,
  productRate,
  productSinglePrice,
  productSpecs,
  productTags,
  productCommented,
}: Product) => {
  const CurrentProductNS = useStore(useCurrentProduct);
  useEffect(() => {
    CurrentProductNS.register({
      productId,
      productImageUrls,
      productCoverImageUrl,
      productName,
      productRate,
      productTags,
      productCommented,
      productSinglePrice,
      productSpecs,
    });
    return () => CurrentProductNS.unset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-row justify-between items-start min-h-[700px] py-[20px]">
      <div className="w-[40%] h-full my-[20px] mr-12">
        <ProductCarousel urls={productImageUrls}></ProductCarousel>
      </div>

      <div className="w-[60%] mx-[10%]">
        <ProductDetailCard
          productId={productId}
          productName={productName}
          productSinglePrice={productSinglePrice}
          productRate={productRate}
          productTags={productTags}
          productCommented={productCommented}
          productSpecs={productSpecs}
        />
      </div>
    </div>
  );
};

export default ProductDetailDisplay;
