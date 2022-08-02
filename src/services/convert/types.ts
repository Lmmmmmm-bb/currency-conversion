import { IBaseResponse, ISOCodeEnum, OmitResponse } from '@/common/models';
import { ILatestOptions } from '..';

export interface IConvertOptions extends ILatestOptions {
  from: ISOCodeEnum;
  to: ISOCodeEnum;
}

export type ConvertQueryType = {
  from: ISOCodeEnum;
  to: ISOCodeEnum;
  amount: number;
};

export interface IConvertResponse extends IBaseResponse {
  historical: boolean;
  date: string;
  result: number;
  query: ConvertQueryType;
  info: {
    rate: number;
  };
}

export type Response = OmitResponse<IConvertResponse>;
