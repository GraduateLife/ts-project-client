import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const Words = ({
  children,
  className,
}: {
  children: string | ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={cn('text-md font-semibold tracking-tight my-2', className)}>
      {children}
    </h4>
  );
};

export default Words;
