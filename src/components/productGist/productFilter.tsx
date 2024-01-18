import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/theme/ui/tabs';
import React from 'react';

const ProductFilter = () => {
  return (
    <Tabs defaultValue="brand" className="w-full">
      <TabsList>
        <TabsTrigger value="brand">By brand</TabsTrigger>
        <TabsTrigger value="custom">By custom values</TabsTrigger>
      </TabsList>
      <TabsContent value="brand">by brand content</TabsContent>
      <TabsContent value="custom">by custom content</TabsContent>
    </Tabs>
  );
};

export default ProductFilter;
