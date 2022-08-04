import { getFetch } from '@/common/utils';
import { LatestOptionsType, ILatestResponse, Response } from './types';

export const fetchLatest = async (
  options?: LatestOptionsType
): Promise<Response> => {
  const response = await getFetch<LatestOptionsType, ILatestResponse>(
    '/latest',
    options
  );
  const { success, base, date, rates } = response;
  return { success, base, date, rates };
};

export { Response as ILatestResponse, LatestOptionsType };
