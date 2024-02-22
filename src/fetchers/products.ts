import { IProductFilter, Product } from '@/models/product';
import { PaginateOption, RData, _fetch } from '.';

const endpoint = '/api/products';

export const fetchProducts = async (
  filter?: IProductFilter,
  paginationOptions?: PaginateOption
) => {
  let res: RData<Product[]>;
  if (filter) {
    res = await _fetch<Product[]>(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'force-cache',
        },
        body: JSON.stringify(filter),
      },
      paginationOptions
    );
    return {
      data: Object.values(res.data),
      meta: res.meta,
    };
  } else {
    res = await _fetch<Product[]>(endpoint);
    return {
      data: Object.values(res.data),
    };
  }
};
