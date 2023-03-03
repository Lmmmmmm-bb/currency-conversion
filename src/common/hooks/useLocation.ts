import { onMounted, ref } from 'vue';
import type { ILocationQuery } from '../models';
import { ISOCodeEnum } from '../models';

/**
 * init location query
 * @returns {ILocationQuery}
 */
const initLocation = (): ILocationQuery => {
  const query = new URLSearchParams(location.search);
  const from = query.get('from')?.toUpperCase() ?? ISOCodeEnum.CNY;
  const to = query.get('to')?.toUpperCase() ?? ISOCodeEnum.USD;
  return {
    from: ISOCodeEnum[from] ?? ISOCodeEnum.CNY,
    to: ISOCodeEnum[to] ?? ISOCodeEnum.USD,
  };
};

// global state
const search = ref<ILocationQuery>(initLocation());
export const useLocation = () => {
  const replace = (locationQuery: ILocationQuery) => {
    const query = Object.entries(locationQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    search.value = locationQuery;
    history.replaceState(null, '', `?${query}`);
  };

  // init query string from url
  onMounted(() => {
    replace(search.value);
  });

  return { search, replace };
};
