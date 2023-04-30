import { getFetch } from '~/common/utils';
import type {
  ISymbol,
  ISymbolsOptions,
  ISymbolsResponse,
  Response,
} from './types';

export const fetchSymbols = async (
  options?: ISymbolsOptions,
): Promise<Response> => {
  const response = await getFetch<ISymbolsOptions, ISymbolsResponse>(
    '/symbols',
    options,
  );
  const { success, symbols } = response;
  return { success, symbols };
};

export { ISymbol, ISymbolsOptions, Response as ISymbolsResponse };
