import { cn } from '@/lib/utils';
import Title from '@/theme/typography/title';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/theme/ui/tabs';
import React from 'react';
import ProductFilterForm from '../forms/productFilterForm';

const ProductFilter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'w-full p-3 border rounded-sm min-w-[250px] dark:bg-black',
        className
      )}
    >
      <Title className="my-3">Product Filter</Title>
      <ProductFilterForm></ProductFilterForm>
    </div>
  );
};

export default ProductFilter;
