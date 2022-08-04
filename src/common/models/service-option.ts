import { ISOCodeEnum } from '.';

export type FormatType = 'xml' | 'csv' | 'tsv';

export interface IBaseOptions {
  // `base`, the currency to convert from.
  base?: ISOCodeEnum;
  // `symbols`, a string of `ISOCodeEnum` split by comma.
  symbols?: string;
  // `amount`, how many currencies you want to convert.
  amount?: number;
  // `places`, round numbers to decimal place.
  places?: number;
  // `format`, format output.
  format?: FormatType;
  // TODO: `source` option field.
  // source?: string;
}
