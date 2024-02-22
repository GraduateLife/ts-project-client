'use client';

import React, { useEffect } from 'react';
import BaseCarousel from '../base/baseCarousel';
import BaseImage from '../base/baseImage';

const ProductCarousel = ({ urls }: { urls: string[] }) => {
  return (
    <BaseCarousel
      containerAttrs={{ className: 'w-[37.5rem]' }}
      contentAttrs={{ className: 'h-[37.5rem] ml-0' }}
      autoPlay={false}
    >
      {urls.map((item, idx) => {
        return (
          <BaseImage
            key={idx}
            src={item}
            alt={item}
            width={600}
            height={600}
          ></BaseImage>
        );
      })}
    </BaseCarousel>
  );
};

export default ProductCarousel;
