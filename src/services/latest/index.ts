import { getFetch } from '@/common/utils';
import { ILatestResponse, Response } from './types';

export const fetchLatest = async (): Promise<Response> => {
  const response = await getFetch<never, ILatestResponse>('/latest');
  const { success, base, date, rates } = response;
  return { success, base, date, rates };
};

export { ILatestResponse };
