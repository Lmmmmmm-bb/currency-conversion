import { getFetch } from '@/common/utils';
import { ITimeSeriesOptions, ITimeSeriesResponse, Response } from './type';

export const fetchTimeSeries = async (
  options?: ITimeSeriesOptions
): Promise<Response> => {
  const response = await getFetch<ITimeSeriesOptions, ITimeSeriesResponse>(
    '/timeseries',
    options
  );
  const {
    success,
    timeseries,
    base,
    start_date: startDate,
    end_date: endDate,
    rates
  } = response;
  return { success, timeseries, base, startDate, endDate, rates };
};

export { Response as ITimeSeriesResponse, ITimeSeriesOptions };
