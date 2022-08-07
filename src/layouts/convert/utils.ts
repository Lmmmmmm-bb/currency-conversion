import dayjs from 'dayjs';

export const disablePreviousDate = (timestamp: number) =>
  timestamp > dayjs().valueOf();
