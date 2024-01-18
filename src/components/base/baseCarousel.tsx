'use client';
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/theme/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

type CarouselProps = {
  /**
   * @param containerAttrs controls width
   */
  containerAttrs: HTMLAttributes<HTMLDivElement>;
  /**
   * @param contentAttrs controls height
   */
  contentAttrs: HTMLAttributes<HTMLDivElement>;
  children: ReactNode[];
  autoPlay: false | number;
};

const BaseCarousel = ({
  containerAttrs,
  contentAttrs,
  children,
  autoPlay,
}: CarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  let _autoPlay = undefined;
  if (autoPlay !== false) {
    _autoPlay = [Autoplay({ delay: autoPlay })];
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div {...containerAttrs}>
      <Carousel setApi={setApi} plugins={_autoPlay}>
        <CarouselContent {...contentAttrs}>
          {children.map((child, idx) => {
            return (
              <CarouselItem key={idx} className="relative">
                {child}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default BaseCarousel;
