import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '~/common/models';

/**
 * @extends {IBaseOptions}
 */
export interface IConvertOptions extends IBaseOptions {
  /**
   * @type {ISOCodeEnum}
   * @description Currency code to convert from.
   * @example ISOCodeEnum.CNY
   */
  from: ISOCodeEnum;
  /**
   * @type {ISOCodeEnum}
   * @description Currency code to convert to.
   * @example ISOCodeEnum.USD
   */
  to: ISOCodeEnum;
}

export type ConvertQueryType = {
  from: ISOCodeEnum;
  to: ISOCodeEnum;
  amount: number;
};

export interface IConvertResponse extends IBaseResponse {
  /**
   * @type {boolean}
   * @example true
   */
  historical: boolean;
  /**
   * @type {string}
   * @description convert rate date, format by `YYYY-MM-DD`.
   * @example '2022-08-06'
   */
  date: string;
  /**
   * @type {number}
   * @description convert rate.
   * @example 1.23
   */
  result: number;
  /**
   * @type {ConvertQueryType}
   * @description fetch query params.
   */
  query: ConvertQueryType;
  /**
   * @description convert info.
   * @example { rate: 1.23 }
   */
  info: {
    rate: number;
  };
}

export type Response = OmitResponse<IConvertResponse>;
