import { ISOCodeEnum } from '~/common/models';

export const transformChartData = (rates: {
  [key in string]: { [key in ISOCodeEnum]: number };
}) => {
  const labels = Object.keys(rates).map((label) =>
    label.replace(/^\d{4}-/, '')
  );
  const data = Object.values(rates).map((rate) => Object.values(rate)[0]);
  return { labels, data };
};
