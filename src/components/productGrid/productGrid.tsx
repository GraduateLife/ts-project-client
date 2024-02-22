'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from './productCard';
import { Product } from '@/models/product';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { fetchProducts } from '@/fetchers/products';
import Title from '@/theme/typography/title';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useStore } from 'zustand';

type ProductGridProp = {
  className?: string;
};

const pageSize = 20;

const ProductGrid = ({ className = '' }: ProductGridProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const UserActivityNS = useStore(useUserActivity);

  const { data, meta, isLoading } = useInfiniteScroll(
    () =>
      fetchProducts(UserActivityNS.recorded.selectedProductFilter, {
        page: currentPage,
        limit: pageSize,
      }),
    currentPage,
    pageSize
  );
  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useCallback(
    (ele: HTMLElement) => {
      if (observer.current) observer.current.disconnect();
      if (isLoading) return;
      if (!ele) return;
      observer.current = new IntersectionObserver((ent) => {
        if (ent[0].isIntersecting) {
          if (meta && meta.currentPage !== meta.overallPage) {
            setCurrentPage((_old) => _old + 1);
          }
        }
      });
      observer.current.observe(ele);
    },
    [isLoading, meta]
  );

  if (isLoading) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        HOLD ON!
      </div>
    );
  }

  return (
    <div className="w-[95%] flex flex-col justify-between items-center">
      {meta &&
        (meta.overallPageItemCount === 0 ? (
          <Title className="flex-grow">Sorry, there is no such product</Title>
        ) : (
          <Title className="flex-grow">
            Found {meta.overallPageItemCount} Products in total
          </Title>
        ))}
      <div
        className={cn(
          'grid grid-cols-2 xl:grid-cols-4 grid-flow-row gap-4 place-items-center',
          className
        )}
      >
        {data.map(
          (
            {
              productId,
              productImageUrls,
              productCoverImageUrl,
              productName,
              productRate,
              productSinglePrice,
              productTags,
              productCommented,
            },
            idx
          ) => {
            if (idx === data.length - 1) {
              return (
                <ProductCard
                  ref={lastItemRef}
                  key={productId}
                  productId={productId}
                  productImageUrls={productImageUrls}
                  productCoverImageUrl={productCoverImageUrl}
                  productName={productName}
                  productRate={productRate}
                  productTags={productTags}
                  productCommented={productCommented}
                  productSinglePrice={productSinglePrice}
                ></ProductCard>
              );
            }
            return (
              <ProductCard
                key={productId}
                productId={productId}
                productImageUrls={productImageUrls}
                productCoverImageUrl={productCoverImageUrl}
                productName={productName}
                productRate={productRate}
                productTags={productTags}
                productCommented={productCommented}
                productSinglePrice={productSinglePrice}
              ></ProductCard>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
