import { IBaseResponse } from '../models';

type FetchQueryType = Record<string, string | number>;

export async function getFetch<
  T extends FetchQueryType,
  R extends IBaseResponse = IBaseResponse
>(url: string, query?: T): Promise<R> {
  // concat query string
  const queryString = query
    ? `?${Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';

  const response = await fetch(`${url}${queryString}`);

  return response.json();
}
