import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

const BaseGrid = ({ className, children }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 xl:grid-cols-5 grid-flow-row gap-4 place-items-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default BaseGrid;
