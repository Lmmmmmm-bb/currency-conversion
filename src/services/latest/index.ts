import { getFetch } from '@/common/utils';
import { ILatestOptions, ILatestResponse, Response } from './types';

export const fetchLatest = async (
  options?: ILatestOptions
): Promise<Response> => {
  const response = await getFetch<ILatestOptions, ILatestResponse>(
    '/latest',
    options
  );
  const { success, base, date, rates } = response;
  return { success, base, date, rates };
};

export { ILatestResponse, ILatestOptions };
