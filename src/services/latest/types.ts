import {
  FormatType,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '@/common/models';

export interface ILatestOptions {
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

export interface ILatestResponse extends IBaseResponse {
  base: ISOCodeEnum;
  date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = OmitResponse<ILatestResponse>;
