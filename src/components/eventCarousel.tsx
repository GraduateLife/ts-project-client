'use client';
import React, { Fragment } from 'react';
import BaseCarousel from './base/baseCarousel';
import BaseImage from './base/baseImage';
import { picsumUrl } from '@/mock/constants';
import { SiteEvent } from '@/models/event';

type _EventCarouselProps = {
  imageUrls: string[];
  imagePermLinks: string[];
  autoPlay?: number | false;
};

type EventCarouselProps = {
  data: SiteEvent[];
} & {
  autoPlay?: number | false;
};

const EventCarousel = ({ data, autoPlay = 2500 }: EventCarouselProps) => {
  return (
    <BaseCarousel
      containerAttrs={{ className: 'w-full' }}
      contentAttrs={{ className: 'h-[40rem]' }}
      autoPlay={autoPlay}
    >
      {data.map(({ url, alt, link }, idx) => {
        return (
          <div key={idx}>
            <BaseImage
              width={1600}
              height={800}
              src={url}
              alt={alt}
            ></BaseImage>
          </div>
        );
      })}
    </BaseCarousel>
  );
};

export default EventCarousel;
