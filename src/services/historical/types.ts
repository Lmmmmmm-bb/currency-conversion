import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  ISOCodeType,
  OmitResponse
} from '~/common/models';

/**
 * @see IBaseOptions detail
 */
export type HistoricalOptionsType = IBaseOptions;

/**
 * @extends {IBaseResponse}
 */
export interface IHistoricalResponse extends IBaseResponse {
  /**
   * @type {boolean}
   * @example true
   */
  historical: boolean;
  /**
   * @type {ISOCodeEnum}
   * @description base currency code.
   * @example ISOCodeEnum.CNY
   */
  base: ISOCodeEnum;
  /**
   * @type {string}
   * @description date of the historical, format by `YYYY-MM-DD`.
   * @example '2022-08-06'
   */
  date: string;
  /**
   * @type {Record<ISOCodeEnum, number>}
   * @description Currency code to rate.
   */
  rates: ISOCodeType;
}

export type Response = OmitResponse<IHistoricalResponse>;
