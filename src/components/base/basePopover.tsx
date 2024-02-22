import { Popover, PopoverContent, PopoverTrigger } from '@/theme/ui/popover';
import React, { ReactNode } from 'react';

type BasePopoverProp = {
  trigger: ReactNode;
  children: ReactNode;
};

const BasePopover = ({ trigger, children }: BasePopoverProp) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};

export default BasePopover;
