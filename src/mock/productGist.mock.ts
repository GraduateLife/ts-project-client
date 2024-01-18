export const _gist = new Array(7).fill({
  pictureUrl: 'https://picsum.photos/100/200',
  publishedAt: new Date(),
  brand: {
    name: 'Johvewvweb',
    createdAt: new Date(),
  },
});

export type ProductGist = {
  pictureUrl: string;
  brand: BrandGist;
  publishedAt: string | Date;
};

export type BrandGist = {
  name: string;
  createdAt: string | Date;
};
