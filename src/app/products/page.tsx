import ProductFilter from '@/components/productGrid/productFilter';
import ProductGrid from '@/components/productGrid/productGrid';
import React from 'react';

const ProductPage = async () => {
  return (
    <div className="flex justify-between mt-3 mb-3">
      <div className="relative">
        <ProductFilter className="sticky top-20 min-w-[252px]"></ProductFilter>
      </div>

      <ProductGrid className="xl:grid-cols-4 flex-grow max-w-[1200px]"></ProductGrid>
    </div>
  );
};

export default ProductPage;
