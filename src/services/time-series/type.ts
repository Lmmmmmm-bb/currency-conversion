import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
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

export interface ITimeSeriesResponse extends IBaseResponse {
  timeseries: boolean;
  base: ISOCodeEnum;
  start_date: string;
  end_date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = Omit<
  OmitResponse<ITimeSeriesResponse>,
  'start_date' | 'end_date'
> & { startDate: string; endDate: string };
