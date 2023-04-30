import type { ISOCodeType } from '~/common/models';
import { ChartRangeEnum } from './types';

export const transformChartData = (rates: {
  [key in string]: ISOCodeType;
}) => {
  const keys = Object.keys(rates);
  const labels = keys.map(label =>
    keys.length === ChartRangeEnum.Year ? label : label.replace(/^\d{4}-/, ''),
  );
  const data = Object.values(rates).map(rate => Object.values(rate)[0]);
  return { labels, data };
};
