import { SiteComment } from '@/models/comment';
import { createImage, genNumber } from './constants';
import { faker } from '@faker-js/faker';

export const createComments = (count: number): SiteComment[] => {
  return new Array(count).fill(null).map((item) => {
    return {
      userProfileUrl: createImage(25).src,
      userName: faker.lorem.words({ min: 1, max: 2 }),
      userRate: genNumber(1, 5),
      publishedAt: new Date().toLocaleString(),
      commentTitle: faker.lorem.words({ min: 1, max: 2 }),
      commentContent: faker.lorem.words({ min: 5, max: 50 }),
    };
  });
};
