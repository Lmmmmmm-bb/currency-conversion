import {
  IBaseOptions,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '~/common/models';

export type LatestOptionsType = IBaseOptions;

export interface ILatestResponse extends IBaseResponse {
  base: ISOCodeEnum;
  date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = OmitResponse<ILatestResponse>;
