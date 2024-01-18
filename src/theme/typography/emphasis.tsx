import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

type EmphasisProp = {
  children: string;
} & HTMLAttributes<HTMLElement>;

const Emphasis = ({ className, children, ...rest }: EmphasisProp) => {
  return (
    <em className={cn('font-extrabold not-italic', className)} {...rest}>
      {children}
    </em>
  );
};

export default Emphasis;
