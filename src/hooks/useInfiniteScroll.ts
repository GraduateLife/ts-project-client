import { PaginateMetadata, RData, _fetch } from '@/fetchers';
import { fetchProducts } from '@/fetchers/products';
import { Product } from '@/models/product';
import { useEffect, useState } from 'react';

export const useInfiniteScroll = <T>(
  fetcher: () => Promise<RData<T[]>>,
  pageNumber: number,
  pageSize: number
) => {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginateMetadata>();
  const [isLoading, setIsLoading] = useState(true);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (isOver) return;

    const getData = async () => {
      const { data: _data, meta: _meta } = await fetcher();
      setMeta(_meta);
      if (_meta && _meta.overallPage === _meta.currentPage) {
        setIsOver(true);
      }
      setData((_old) => {
        if (_old.length === (pageNumber - 1) * pageSize) {
          //res has not been pushed
          return [..._old, ..._data];
        }
        //res has been pushed
        return [..._old];
      });
    };
    if (data.length !== pageNumber * pageSize) {
      getData();
    }

    setIsLoading(false);
  }, [fetcher, pageNumber, pageSize, isOver, isLoading, data.length]);

  return { data, isLoading, meta };
};

export default useInfiniteScroll;
