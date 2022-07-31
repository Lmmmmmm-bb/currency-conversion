import { getFetch } from '@/common/utils';
import { ISymbolsResponse, ISymbol, Response, ISymbolsOptions } from './types';

export const fetchSymbols = async (
  options?: ISymbolsOptions
): Promise<Response> => {
  const response = await getFetch<ISymbolsOptions, ISymbolsResponse>(
    '/symbols',
    options
  );
  const { success, symbols } = response;
  return { success, symbols };
};

export { ISymbolsResponse, ISymbol };
