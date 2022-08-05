import { getFetch } from '@/common/utils';
import {
  FluctuationOptionsType,
  IFluctuationResponse,
  Response
} from './types';

export const fetchFluctuation = async (
  options: FluctuationOptionsType
): Promise<Response> => {
  const response = await getFetch<FluctuationOptionsType, IFluctuationResponse>(
    '/fluctuation',
    options
  );
  const {
    success,
    fluctuation,
    start_date: startDate,
    end_date: endDate,
    rate
  } = response;
  return { success, fluctuation, startDate, endDate, rate };
};

export { Response as IFluctuationResponse, FluctuationOptionsType };
