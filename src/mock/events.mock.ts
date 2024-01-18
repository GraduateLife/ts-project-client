import { ipsumUrl } from './constants';

export const createEvents = () =>
  new Array(5).fill(null).map((item) => {
    return {
      url: ipsumUrl([800, 600]),
      link: 'http://picsum.photos',
    };
  });
