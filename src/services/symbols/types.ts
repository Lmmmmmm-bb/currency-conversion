import { IBaseResponse, ISOCodeEnum } from '@/common/models';

export interface ISymbol {
  code: ISOCodeEnum;
  description: string;
}

export interface ISymbolsResponse extends IBaseResponse {
  symbols: {
    [key in ISOCodeEnum]: ISymbol[];
  };
}

export type Response = Omit<ISymbolsResponse, 'motd'>;
