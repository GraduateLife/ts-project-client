import React, { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/theme/ui/tabs';

import ProductIntroduction from '@/components/productDetail/productIntroduction';
import Spacer from '@/theme/typography/spacer';
import CommentList from '@/components/comment/commentList';
import {
  GetServerSideProps,
  GetStaticProps,
  Metadata,
  ResolvingMetadata,
} from 'next';
import ProductDetailDisplay from '@/components/productDetail/productDetailDisplay';
import { _fetch } from '@/fetchers';
import SkipSSR from '@/theme/ui/SkipSSR';

type ProductDetailProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/products/' + params.id
  );
  const { data } = await res.json();
  return {
    title: data.productName,
  };
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  // const thisProduct = createOneProduct(params.id);

  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/products/' + params.id
  );
  const { data } = await res.json();

  const {
    productId,
    productImageUrls,
    productCoverImageUrl,
    productName,
    productRate,
    productSinglePrice,
    productSpecs,
    productTags,
    productCommented,
  } = data;
  return (
    <>
      <ProductDetailDisplay
        productId={productId}
        productImageUrls={productImageUrls}
        productCoverImageUrl={productCoverImageUrl}
        productName={productName}
        productRate={productRate}
        productTags={productTags}
        productCommented={productCommented}
        productSinglePrice={productSinglePrice}
        productSpecs={productSpecs}
      />
      <Tabs defaultValue="Introduction" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Introduction">Introduction</TabsTrigger>
          <TabsTrigger value="Comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="Introduction">
          <Spacer />
          <ProductIntroduction
            mdString={'I **love** using [Next.js](https://nextjs.org/)'}
          />
          <Spacer />
        </TabsContent>
        <TabsContent value="Comments">
          <Spacer />
          <CommentList />
          <Spacer />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductDetailPage;
