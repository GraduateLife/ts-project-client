import * as React from 'react';
import Image from 'next/image';

import { ScrollArea, ScrollBar } from '@/theme/ui/scroll-area';
import { ProductGist } from '@/mock/productGist.mock';
import BrandCard from './brandCard';

type ScrollAbleProps = {
  data: ProductGist[];
};

const ProductScrollAble = ({ data }: ScrollAbleProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4">
        {data.map((item) => (
          <figure
            key={item.brand.name}
            className="flex flex-col items-center justify-center"
          >
            <div className="overflow-hidden rounded-md relative w-[200px] h-[300px]">
              {/* <Image
                src={item.pictureUrl}
                alt={item.brand.name}
                className="aspect-[3/4]  w-[200px] h-[250px] object-cover"
                width={100}
                height={200}
              /> */}
              <Image
                src="https://picsum.photos/200/300?a=1&"
                alt="pic"
                // width={1600}
                // height={400}
                layout="fill"
              />
            </div>
            {/* <figcaption className="text-xs text-muted-foreground">
              from */}
            {/* <div className="font-semibold text-foreground"> */}
            <div>
              <BrandCard
                name={item.brand.name}
                publishedAt={item.publishedAt}
              />
            </div>

            {/* </div> */}
            {/* </figcaption> */}
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProductScrollAble;
