import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type TitleProps = {
  children: string | ReactNode;
  className?: string;
  offset?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Title = ({ children, className, offset = '0', ...rest }: TitleProps) => {
  return (
    <h2
      className={cn(
        `md:text-2xl text-3xl font-semibold tracking-tight transition-colors my-10 md:my-5 capitalize pl-${offset}`,
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default Title;
