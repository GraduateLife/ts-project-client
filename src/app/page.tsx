import ProductGrid from '@/components/productGist/productGrid';
import ProductScrollAble from '@/components/productScrollable';

import Spacer from '@/theme/typography/spacer';
import Title from '@/theme/typography/title';
import EventCarousel from '@/components/eventCarousel';
import { Product } from '@/models/product';
import { ipsumUrl } from '@/mock/constants';

type EVENTS = {
  url: string;
  link: string;
};

export default async function Home() {
  const eventRes = await fetch(process.env.BASE_URL + '/api/events');
  if (!eventRes.ok) {
    throw new Error('reach_failure');
  }
  const { code: eventCode, data: eventData } = await eventRes.json();
  if (eventCode === 'fal') {
    throw new Error('broken_data');
  }
  const gotEvents: EVENTS[] = Object.values(eventData);
  // console.log(gotEvents[0].url);

  const res = await fetch(process.env.BASE_URL + '/api/products');
  if (!res.ok) {
    throw new Error('reach_failure');
  }
  const { code, data } = await res.json();
  if (code === 'fal') {
    throw new Error('broken_data');
  }
  const gotProducts = Object.values(data) as Product[];

  return (
    <>
      <Title>latest events</Title>
      <EventCarousel
        imageUrls={gotEvents.map((item) => item.url)}
        imagePermLinks={gotEvents.map((item) => item.link)}
      />
      <Spacer />

      {/* <Title>Recommended for you</Title>
      <ProductScrollAble data={_gist} /> */}

      <Spacer />

      <Title>Featured Products</Title>
      <ProductGrid data={gotProducts} />
      <Spacer />
    </>
  );
}
