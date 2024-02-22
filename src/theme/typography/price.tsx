import React, { ReactNode } from 'react';

const Price = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-orange-700 font-extrabold text-2xl;">{children}</span>
  );
};

export default Price;
