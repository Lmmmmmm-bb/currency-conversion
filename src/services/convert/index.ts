import { getFetch } from '@/common/utils';
import { IConvertOptions, IConvertResponse, Response } from './types';

export const fetchConvert = async (
  options?: IConvertOptions
): Promise<Response> => {
  const response = await getFetch<IConvertOptions, IConvertResponse>(
    '/convert',
    options
  );
  const { success, historical, date, result, query, info } = response;
  return { success, historical, date, result, query, info };
};
