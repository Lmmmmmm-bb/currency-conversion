import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '@/common/models';

export interface IConvertOptions extends IBaseOptions {
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
