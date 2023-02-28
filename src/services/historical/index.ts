import type {
  HistoricalOptionsType,
  IHistoricalResponse,
  Response,
} from './types';
import { getFetch } from '~/common/utils';

/**
 * Historical Currency Exchange Rate Service
 * @param path format `YYYY-MM-DD`
 * @param options `HistoricalOptionsType`
 * @returns `IHistoricalResponse`
 */
export const fetchHistorical = async (
  path: string,
  options?: HistoricalOptionsType,
): Promise<Response> => {
  const response = await getFetch<HistoricalOptionsType, IHistoricalResponse>(
    `/${path}`,
    options,
  );
  const { success, base, date, historical, rates } = response;
  return { success, base, date, historical, rates };
};

export { HistoricalOptionsType, Response as IHistoricalResponse };
