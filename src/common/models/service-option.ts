import { ISOCodeEnum } from '.';

export type FormatType = 'xml' | 'csv' | 'tsv';

export interface IBaseOptions {
  /**
   * @type {ISOCodeEnum}
   * @description the currency to convert from.
   * @example ISOCodeEnum.CNY
   */
  base?: ISOCodeEnum;
  /**
   * @type {string}
   * @description a string of comma-separated currency codes.
   * @example 'CNY,USD'
   */
  symbols?: string;
  /**
   * @type {number}
   * @description the amount to convert.
   * @example 100
   */
  amount?: number;
  /**
   * @type {number}
   * @description the decimal place to round to.
   * @example 2
   */
  places?: number;
  // `format`, format output.
  /**
   * @type {FormatType}
   * @description the format of the output.
   * @example 'csv'
   */
  format?: FormatType;
  // TODO: `source` option field.
  // source?: string;
}
