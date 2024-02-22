import React, { ReactNode } from 'react';

const AsLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"'>
      {children}
    </div>
  );
};

export default AsLabel;
