import { FIRST_PAGE, MS_IN_SECOND, TIME_DECIMALS } from '../constants';

export const msToSeconds = (ms: number): number =>
  Number((ms / MS_IN_SECOND).toFixed(TIME_DECIMALS));

export const getTotalPages = (totalCount: number, pageSize: number): number =>
  Math.max(FIRST_PAGE, Math.ceil(totalCount / pageSize));

export const isFulfilledResult = <T>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> => result.status === 'fulfilled';

export const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError';
