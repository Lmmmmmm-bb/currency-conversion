import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '@/common/models';

export type HistoricalOptionsType = IBaseOptions;

export interface IHistoricalResponse extends IBaseResponse {
  historical: boolean;
  base: ISOCodeEnum;
  date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = OmitResponse<IHistoricalResponse>;
