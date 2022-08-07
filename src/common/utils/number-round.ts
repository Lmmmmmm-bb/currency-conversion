import { round } from 'mathjs';

/**
 * Rounds a number to a specified number of decimal places.
 * @param value number to round
 * @param precision number of decimal places, default 2
 * @returns rounded number
 */
export const numberRound = (value: number, precision = 2) =>
  round(value, precision);
