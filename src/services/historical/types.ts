import { IBaseResponse, ISOCodeEnum, OmitResponse } from '@/common/models';
import { ILatestOptions } from '..';

// rename ILatestOptions to IHistoricalOptions
export type HistoricalOptionsType = ILatestOptions;

export interface IHistoricalResponse extends IBaseResponse {
  historical: boolean;
  base: ISOCodeEnum;
  date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = OmitResponse<IHistoricalResponse>;
