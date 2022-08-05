import { IBaseResponse, ISOCodeEnum, OmitResponse } from '~/common/models';
import { ITimeSeriesOptions } from '..';

export type FluctuationOptionsType = ITimeSeriesOptions;

export interface IFluctuationResponse extends IBaseResponse {
  fluctuation: boolean;
  start_date: string;
  end_date: string;
  rate: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = Omit<
  OmitResponse<IFluctuationResponse>,
  'start_date' | 'end_date'
> & { startDate: string; endDate: string };
