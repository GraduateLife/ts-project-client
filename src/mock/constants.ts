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
let seedHolder;
/**
 * @param size size[0] is width,size[1] is height
 */
export const ipsumUrl = (size: number[] | number) => {
  if (isNumber(size)) {
    size = [size];
  }
  const requestSizeParam = size
    .map((dimension) => {
      return dimension.toString();
    })
    .join('/');

  return `https://picsum.photos/${requestSizeParam}?random=${genNumber(1, 50)}`;
};

export const busy = (duration = 1000) =>
  new Promise((res) => setTimeout(() => res(1), duration));
