import type { IBaseResponse } from '../models';

const BASE_URL = 'https://api.exchangerate.host';

type FetchQueryType = Record<string, any>;

/**
 * @description get fetch wrapper
 * @param path fetch url path
 * @param query fetch url query
 * @returns {Promise<Response>}
 */
export async function getFetch<
  T extends FetchQueryType,
  R extends IBaseResponse = IBaseResponse
>(path: string, query?: T): Promise<R> {
  // concat query string
  const queryString = query
    ? `?${Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';

  const response = await fetch(`${BASE_URL}${path}${queryString}`);

  return response.json();
}
