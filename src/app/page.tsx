import ProductGrid from '@/components/productGrid/productGrid';

import Spacer from '@/theme/typography/spacer';
import Title from '@/theme/typography/title';
import EventCarousel from '@/components/eventCarousel';
import { fetchEvents } from '@/fetchers/events';
import { fetchProducts } from '@/fetchers/products';
import Link from 'next/link';
import { Button } from '@/theme/ui/button';
import { Suspense } from 'react';
import BaseGrid from '@/components/base/baseGrid';
import ProductCard from '@/components/productGrid/productCard';

export default async function Home() {
  const gotEvents = await fetchEvents();
  const gotProducts = await fetchProducts();

  return (
    <>
      <Title>latest events</Title>
      <EventCarousel data={gotEvents} />

      <Spacer />

      <div className="flex justify-between items-center">
        <Title>top 10 products</Title>
        <Button variant={'link'} asChild className="text-lg">
          <Link prefetch href={'/products'}>
            See all products
          </Link>
        </Button>
      </div>

      {/* <ProductGrid />
       */}
      <BaseGrid>
        {gotProducts.data.map(
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
      </BaseGrid>
      <Spacer />
    </>
  );
}
