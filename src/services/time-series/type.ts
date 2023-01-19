import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  ISOCodeType,
  OmitResponse
} from '~/common/models';

export interface ITimeSeriesOptions extends IBaseOptions {
  /**
   * @description format 'YYYY-MM-DD'
   * @type {string}
   * @example '2022-08-04'
   * @default today
   */
  start_date: string;
  /**
   * @description format 'YYYY-MM-DD'
   * @type {string}
   * @example '2022-08-04'
   * @default today
   */
  end_date: string;
}

/**
 * @extends {IBaseResponse}
 */
export interface ITimeSeriesResponse extends IBaseResponse {
  /**
   * @type {boolean}
   * @example true
   */
  timeseries: boolean;
  /**
   * @type {ISOCodeEnum}
   * @description base currency code.
   * @example ISOCodeEnum.CNY
   */
  base: ISOCodeEnum;
  /**
   * @type {string}
   * @description date of the historical, format by `YYYY-MM-DD`.
   * @example '2022-08-04'
   */
  start_date: string;
  /**
   * @type {string}
   * @description date of the historical, format by `YYYY-MM-DD`.
   * @example '2022-08-04'
   */
  end_date: string;
  /**
   * @type {Record<ISOCodeEnum, number>}
   * @description Currency code to rate.
   */
  rates: {
    [key in string]: ISOCodeType;
  };
}

export type Response = Omit<
  OmitResponse<ITimeSeriesResponse>,
  'start_date' | 'end_date'
> & { startDate: string; endDate: string };
