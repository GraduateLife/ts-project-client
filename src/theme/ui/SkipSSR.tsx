import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const SkipSSR = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(SkipSSR), { ssr: false });
