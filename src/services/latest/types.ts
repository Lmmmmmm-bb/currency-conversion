import { IBaseResponse, ISOCodeEnum } from '@/common/models';

export interface ILatestResponse extends IBaseResponse {
  base: ISOCodeEnum;
  date: string;
  rates: {
    [key in ISOCodeEnum]: number;
  };
}

export type Response = Omit<ILatestResponse, 'motd'>;
