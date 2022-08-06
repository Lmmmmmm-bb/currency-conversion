import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '~/common/models';

/**
 * @see IBaseOptions detail
 */
export type LatestOptionsType = IBaseOptions;

export interface ILatestResponse extends IBaseResponse {
  /**
   * @type {ISOCodeEnum}
   * @description base currency code.
   * @example ISOCodeEnum.CNY
   */
  base: ISOCodeEnum;
  /**
   * @type {string}
   * @description date of the latest, format by `YYYY-MM-DD`.
   * @example '2022-08-06'
   */
  date: string;
  /**
   * @type {Record<ISOCodeEnum, number>}
   * @description Currency code to rate.
   */
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = OmitResponse<ILatestResponse>;
