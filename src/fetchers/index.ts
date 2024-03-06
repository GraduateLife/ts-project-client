export const _fetch = async <T>(
  url: string,
  config?: RequestInit,
  paginationOption?: PaginateOption
) => {
  if (!url.startsWith('/api')) {
    console.log('do not try to add api root path on your own');
    throw new Error('fatal!');
  }
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    url = process.env.NEXT_PUBLIC_BASE_URL + url;
  }

  if (paginationOption) {
    const qs = deriveQueryStringFromObject(paginationOption);
    url = url + qs;
  }

  const res = await fetch(url, config);
  if (!res.ok) {
    throw new Error(ErrorMsg.PROBLEMATIC_URL);
  }
  const { code, data, meta = null } = (await res.json()) as R<T>;
  if (code === 'fal') {
    throw new Error(ErrorMsg.SERVER_REJECTED);
  }
  if (meta) {
    return {
      meta,
      data,
    };
  }
  return { data };
};

/**
 * @param currentPage must >=1
 * @param overallPage must >=currentPage
 * @param distributedPageItemCount is the number assigned
 */
export type PaginateMetadata = {
  currentPage: number;
  overallPage: number;
  currentPageItemCount: number;
  distributedPageItemCount: number;
  overallPageItemCount: number;
};

export type PaginateOption = {
  page: number;
  limit: number;
};

export const deriveQueryStringFromObject = (
  obj: Record<string, string | number | boolean>
) => {
  const entries = Object.entries(obj);
  if (entries.length === 0) {
    return '';
  }
  let res = '?';
  let round = 0;
  for (const [k, v] of entries) {
    const pair = k + '=' + v;
    res += pair;
    if (round < entries.length - 1) {
      res += '&';
      round++;
    }
  }
  return res;
};

export type R<T> = {
  code: 'suc' | 'fal';
  data: T;
  meta?: PaginateMetadata;
};

export type RData<T> = {
  data: T;
  meta?: PaginateMetadata;
};

export enum ErrorMsg {
  /**
   * @param PROBLEMATIC_URL means this url is invalid
   */
  PROBLEMATIC_URL = 'problematic_url',
  SERVER_REJECTED = 'server_rejected',
}
