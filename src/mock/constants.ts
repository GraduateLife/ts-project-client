import { isNumber } from 'lodash';

export const genNumber = (
  min: number,
  max: number,
  integer: boolean = true
) => {
  if (min > max) {
    throw new Error('cannot achieve');
  }
  if (min === max) return min;
  if (integer) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
};

export const pickOne = <T>(anArray: T[]) =>
  anArray[~~(Math.random() * anArray.length)];

/**
 * @param size size[0] is width,size[1] is height
 */
export const picsumUrl = (size: number[] | number, givenId?: string) => {
  if (isNumber(size)) {
    size = [size];
  }
  const requestSizeParam = size
    .map((dimension) => {
      return dimension.toString();
    })
    .join('/');
  const seed = givenId ?? genNumber(1, 50);

  return `https://picsum.photos/${requestSizeParam}?random=${seed}`;
};

export const createImage = (
  size: number[] | number,
  givenId?: string
): {
  src: string;
  alt: string;
} => {
  const src = picsumUrl(size, givenId);
  const alt = src.split('random=')[1];
  return {
    src,
    alt,
  };
};

export const busy = (duration = 1000) => {
  if (process.env.NODE_ENV !== 'development') {
    duration = 0;
  }
  return new Promise((res) => setTimeout(() => res(1), duration));
};
