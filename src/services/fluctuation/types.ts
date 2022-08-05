import { IBaseResponse, ISOCodeEnum, OmitResponse } from '~/common/models';
import { ITimeSeriesOptions } from '..';

export type FluctuationOptionsType = ITimeSeriesOptions;

export interface IRateInfo {
  start_rate: number;
  end_rate: number;
  change: number;
  change_pct: number;
}

export interface ICamelCaseRateInfo {
  startRate: number;
  endRate: number;
  change: number;
  changePct: number;
}

export interface IFluctuationResponse extends IBaseResponse {
  fluctuation: boolean;
  start_date: string;
  end_date: string;
  rate: {
    [key in ISOCodeEnum]: IRateInfo;
  };
}

export type Response = Omit<
  OmitResponse<IFluctuationResponse>,
  'start_date' | 'end_date' | 'rate'
> & {
  startDate: string;
  endDate: string;
  rate: {
    [key in ISOCodeEnum]: ICamelCaseRateInfo;
  };
};
