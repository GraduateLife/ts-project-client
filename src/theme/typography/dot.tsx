import { cn } from '@/lib/utils';
import React from 'react';

type X = {
  animate?: boolean;
  position: string;
  baseColor?: string;
  shimColor?: string;
  size?: number;
};

const Dot = ({ position, animate, size = 3, baseColor, shimColor }: X) => {
  return (
    <div className={position}>
      <span className={`relative flex h-${size} w-${size}`}>
        <span
          className={cn(
            ' absolute inline-flex h-full w-full rounded-full  opacity-75',
            animate ?? 'animate-ping',
            shimColor ?? 'bg-orange-400'
          )}
        ></span>
        <span
          className={cn(
            `relative inline-flex rounded-full h-${size} w-${size} `,
            baseColor ?? 'bg-primary'
          )}
        ></span>
      </span>
    </div>
  );
};

export default Dot;
