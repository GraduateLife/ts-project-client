import { cn } from '@/lib/utils';
import React, { ComponentProps, ReactNode } from 'react';

const Words = ({ children, className }: ComponentProps<'h4'>) => {
  return (
    <h4 className={cn('text-md font-semibold tracking-tight my-2', className)}>
      {children}
    </h4>
  );
};

export default Words;
