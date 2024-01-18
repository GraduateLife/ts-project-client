import BaseCarousel from '@/components/base/baseCarousel';
import React, { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/theme/ui/tabs';
import ProductDetailCard from '@/components/productDetail/productDetailCard';
import { ipsumUrl } from '@/mock/constants';
import ProductIntroduction from '@/components/productDetail/productIntroduction';
import Spacer from '@/theme/typography/spacer';
import CommentList from '@/components/commentList';
import BaseImage from '@/components/base/baseImage';
import { createOneProduct } from '@/mock/product.mock';
import {
  GetServerSideProps,
  GetStaticProps,
  Metadata,
  ResolvingMetadata,
} from 'next';
import { Product } from '@/models/product';
import { isNil } from 'lodash';
import ProductCarousel from '@/components/productDetail/productCarousel';
import ProductDetailDisplay from '@/components/productDetail/productDetailDisplay';

type ProductDetailProps = {
  currentProduct: Product;
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  return {
    title: outsideProduct.productName,
  };
}
let outsideProduct: Product;

const ProductDetailPage = ({ params }: ProductDetailProps) => {
  const thisProduct = createOneProduct(params.id);
  outsideProduct = { ...thisProduct };
  const {
    productId,
    productImageUrls,
    productCoverImageUrl,
    productName,
    productRate,
    productSinglePrice,
    productSpecs,
    productTags,
    productViewed,
  } = thisProduct;
  return (
    <>
      {/* <div className="flex flex-row justify-between items-start min-h-[700px] py-[20px]">
        <div className="w-[40%] h-full my-[20px]">
          <ProductCarousel urls={productImageUrls}></ProductCarousel>
        </div>

        <div className="w-[60%] mx-[10%]">
          <ProductDetailCard
            productId={productId}
            productName={productName}
            productSinglePrice={productSinglePrice}
            productRate={productRate}
            productTags={productTags}
            productViewed={productViewed}
            productSpecs={productSpecs}
          />
        </div>
      </div> */}
      <ProductDetailDisplay
        productId={productId}
        productImageUrls={productImageUrls}
        productCoverImageUrl={productCoverImageUrl}
        productName={productName}
        productRate={productRate}
        productTags={productTags}
        productViewed={productViewed}
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
