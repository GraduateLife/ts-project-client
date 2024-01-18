import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains:
      process.env.NODE_ENV === 'development'
        ? ['picsum.photos', 'images.unsplash.com', 'fastly.picsum.photos']
        : [],
  },
};

const withCustomMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withCustomMDX(nextConfig);
