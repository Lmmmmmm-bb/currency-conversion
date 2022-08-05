import { ISOCodeEnum } from '~/common/models';
import { getFetch } from '~/common/utils';
import {
  FluctuationOptionsType,
  ICamelCaseRateInfo,
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

  // transform under score case to camel case
  const _rate = {} as { [key in ISOCodeEnum]: ICamelCaseRateInfo };
  Object.entries(rate).forEach(([key, info]) => {
    const { start_rate, end_rate, change, change_pct } = info;
    _rate[key] = {
      startRate: start_rate,
      endRate: end_rate,
      change: change,
      changePct: change_pct
    };
  });

  return { success, fluctuation, startDate, endDate, rate: _rate };
};

export {
  FluctuationOptionsType,
  Response as IFluctuationResponse,
  ICamelCaseRateInfo as IRateInfo
};
