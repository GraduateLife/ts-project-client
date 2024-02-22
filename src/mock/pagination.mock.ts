import { PaginateMetadata } from '@/fetchers';

export const createPaginationMeta = (
  currentPage: number,
  pageLimit: number,
  overallNeedCount: number
): PaginateMetadata => {
  const needFullPages = Math.ceil(overallNeedCount / pageLimit);
  const lastPageItemCount =
    overallNeedCount % pageLimit === 0
      ? pageLimit
      : overallNeedCount % pageLimit;
  const isLastPage = currentPage === needFullPages ? true : false;
  let currentPageItemCountShouldBe = isLastPage ? lastPageItemCount : pageLimit;
  if (currentPage > needFullPages) {
    currentPageItemCountShouldBe = 0;
  }
  return {
    currentPage,
    overallPage: needFullPages,
    currentPageItemCount: currentPageItemCountShouldBe,
    distributedPageItemCount: pageLimit,
    overallPageItemCount: overallNeedCount,
  };
};
