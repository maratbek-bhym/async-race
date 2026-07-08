import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCar } from '../../api/garageApi';
import { isNotFoundError } from '../../api/http';
import { createWinner, getWinner, getWinners, updateWinner } from '../../api/winnersApi';
import { FIRST_WIN_COUNT } from '../../constants';
import type { PagedResult, SortField, SortOrder, WinnerRow } from '../../types';

type FetchWinnersArg = {
  page: number;
  sort: SortField;
  order: SortOrder;
};

export const fetchWinners = createAsyncThunk<PagedResult<WinnerRow>, FetchWinnersArg>(
  'winners/fetchWinners',
  async (options) => {
    const { items, totalCount } = await getWinners(options);
    const rows = await Promise.all(
      items.map(async (winner) => ({ ...winner, car: await getCar(winner.id) })),
    );
    return { items: rows, totalCount };
  },
);

type SaveWinnerArg = {
  id: number;
  time: number;
};

export const saveWinner = createAsyncThunk<void, SaveWinnerArg>(
  'winners/saveWinner',
  async ({ id, time }) => {
    try {
      const existing = await getWinner(id);
      await updateWinner(id, { wins: existing.wins + 1, time: Math.min(existing.time, time) });
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error;
      }
      await createWinner({ id, wins: FIRST_WIN_COUNT, time });
    }
  },
);
