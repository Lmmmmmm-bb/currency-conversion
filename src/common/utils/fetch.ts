import { IBaseResponse } from '../models';

const baseUrl = 'https://api.exchangerate.host';

type FetchQueryType = Record<string, string | number>;

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

  const response = await fetch(`${baseUrl}${path}${queryString}`);

  return response.json();
}
