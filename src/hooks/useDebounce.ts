import { debounce } from 'lodash';
import { useLayoutEffect, useMemo, useRef } from 'react';

export function useDebounce(callback: (args: any) => void, delay: number) {
  const rememberedCallback = useRef(callback);
  useLayoutEffect(() => {
    rememberedCallback.current = callback;
  });
  return useMemo(
    () => debounce((args) => rememberedCallback.current(args), delay),
    [delay]
  );
}
