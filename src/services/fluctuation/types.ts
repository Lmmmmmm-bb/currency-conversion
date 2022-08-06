import { IBaseResponse, ISOCodeEnum, OmitResponse } from '~/common/models';
import { ITimeSeriesOptions } from '..';

/**
 * @see IBaseOptions detail
 */
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

/**
 * @extends {IBaseResponse}
 */
export interface IFluctuationResponse extends IBaseResponse {
  /**
   * @type {boolean}
   * @example true
   */
  fluctuation: boolean;
  /**
   * @type {string}
   * @description start date of the fluctuation, format by `YYYY-MM-DD`.
   * @example '2022-08-06'
   */
  start_date: string;
  /**
   * @type {string}
   * @description end date of the fluctuation, format by `YYYY-MM-DD`.
   * @example '2022-08-06'
   */
  end_date: string;
  /**
   * @type {Record<ISOCodeEnum, IRateInfo>}
   * @description Currency code to rate info.
   */
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
