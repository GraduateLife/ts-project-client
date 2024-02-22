import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/theme/ui/tooltip';
import React, { ReactNode } from 'react';

/**
 * @param children is the trigger
 * @param content is the content shows after the trigger is pulled
 */
type HoverAbleProps = {
  children: ReactNode;
  content: ReactNode;
  side?: 'bottom' | 'top' | 'right' | 'left';
};

const BaseHoverAble = ({
  children,
  content,
  side = 'bottom',
}: HoverAbleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full h-full">{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BaseHoverAble;
