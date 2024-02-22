import { createImage } from './constants';

export const createEvents = () =>
  new Array(5).fill(null).map((item) => {
    const x = createImage([800, 600]);
    return {
      url: x.src,
      alt: x.alt,
      link: 'http://picsum.photos',
    };
  });
