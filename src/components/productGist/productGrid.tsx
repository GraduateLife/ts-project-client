import React from 'react';
import ProductFilter from './productFilter';
import ProductCard from '../productCard';
import { Product } from '@/models/product';

type ProductGridProp = {
  data: Product[];
};

const ProductGrid = ({ data }: ProductGridProp) => {
  return (
    <div className="flex justify-between">
      {/* <div className="hidden xl:block xl:w-[20%]">
        <ProductFilter />
      </div> */}
      <div>
        <div className="grid grid-cols-2 xl:grid-cols-5 grid-flow-row gap-4 place-items-center">
          {/* {new Array(6).fill(null).map((item, idx) => {
            return <ProductCard key={idx} />;
          })} */}
          {data.map(
            ({
              productId,
              productImageUrls,
              productCoverImageUrl,
              productName,
              productRate,
              productSinglePrice,
              productTags,
              productViewed,
            }) => {
              return (
                <ProductCard
                  key={productId}
                  productId={productId}
                  productImageUrls={productImageUrls}
                  productCoverImageUrl={productCoverImageUrl}
                  productName={productName}
                  productRate={productRate}
                  productTags={productTags}
                  productViewed={productViewed}
                  productSinglePrice={productSinglePrice}
                ></ProductCard>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
