import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(() => {});

  // useEffect(() => {
  //   savedCallback.current = callback;
  // });

  useEffect(() => {
    savedCallback.current = callback;
    if (delay !== null) {
      const handler = () => savedCallback.current();
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay, callback]);
}
