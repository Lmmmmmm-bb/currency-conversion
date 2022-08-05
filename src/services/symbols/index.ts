import { getFetch } from '~/common/utils';
import { ISymbolsResponse, ISymbolsOptions, ISymbol, Response } from './types';

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

export { Response as ISymbolsResponse, ISymbol, ISymbolsOptions };
