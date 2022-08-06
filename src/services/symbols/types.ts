import {
  FormatType,
  IBaseResponse,
  ISOCodeEnum,
  OmitResponse
} from '~/common/models';

export interface ISymbol {
  code: ISOCodeEnum;
  description: string;
}

export interface ISymbolsOptions {
  format?: FormatType;
}

export interface ISymbolsResponse extends IBaseResponse {
  symbols: {
    [key in ISOCodeEnum]: ISymbol;
  };
}

export type Response = OmitResponse<ISymbolsResponse>;
