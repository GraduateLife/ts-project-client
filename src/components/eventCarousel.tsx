'use client';
import React, { Fragment } from 'react';
import BaseCarousel from './base/baseCarousel';
import BaseImage from './base/baseImage';
import { ipsumUrl } from '@/mock/constants';

type EventCarouselProps = {
  imageUrls: string[];
  imagePermLinks: string[];
  autoPlay?: number | false;
};

const EventCarousel = ({
  imageUrls,
  imagePermLinks,
  autoPlay = 2500,
}: EventCarouselProps) => {
  return (
    <BaseCarousel
      containerAttrs={{ className: 'w-full' }}
      contentAttrs={{ className: 'h-[40rem]' }}
      autoPlay={autoPlay}
    >
      {/* {new Array(5).fill(null).map((_, idx) => {
        return (
          <Fragment key={idx}>
            <BaseImage src={ipsumUrl([1600, 800])}></BaseImage>
          </Fragment>
        );
      })} */}
      {imageUrls.map((item, idx) => {
        return (
          <div key={idx} onClick={() => console.log(imagePermLinks[idx])}>
            <BaseImage className="w-full" src={item}></BaseImage>
          </div>
        );
      })}
    </BaseCarousel>
  );
};

export default EventCarousel;
