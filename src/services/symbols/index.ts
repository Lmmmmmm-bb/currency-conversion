import { getFetch } from '@/common/utils';
import { ISymbolsResponse, ISymbol, Response } from './types';

export const fetchSymbols = async (): Promise<Response> => {
  const response = await getFetch<never, ISymbolsResponse>('/symbols');
  const { success, symbols } = response;
  return { success, symbols };
};

export { ISymbolsResponse, ISymbol };
