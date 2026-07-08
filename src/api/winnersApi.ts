import { WINNERS_PAGE_SIZE } from '../constants';
import type { PagedResult, SortField, SortOrder, Winner, WinnerUpdate } from '../types';
import { http, httpPaged, isNotFoundError } from './http';

const WINNERS_PATH = '/winners';

type GetWinnersOptions = {
  page: number;
  sort: SortField;
  order: SortOrder;
};

export const getWinners = ({
  page,
  sort,
  order,
}: GetWinnersOptions): Promise<PagedResult<Winner>> =>
  httpPaged<Winner>({
    path: WINNERS_PATH,
    query: { _page: page, _limit: WINNERS_PAGE_SIZE, _sort: sort, _order: order },
  });

export const getWinner = (id: number): Promise<Winner> =>
  http<Winner>({ path: `${WINNERS_PATH}/${id}` });

export const createWinner = (winner: Winner): Promise<Winner> =>
  http<Winner>({ path: WINNERS_PATH, method: 'POST', body: winner });

export const updateWinner = (id: number, update: WinnerUpdate): Promise<Winner> =>
  http<Winner>({ path: `${WINNERS_PATH}/${id}`, method: 'PUT', body: update });

export const deleteWinner = async (id: number): Promise<void> => {
  try {
    await http<unknown>({ path: `${WINNERS_PATH}/${id}`, method: 'DELETE' });
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
  }
};
