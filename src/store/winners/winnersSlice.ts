import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FIRST_PAGE, LOAD_ERROR_MESSAGE } from '../../constants';
import type { SortField, SortOrder, WinnerRow } from '../../types';
import { fetchWinners } from './winnersThunks';

type WinnersState = {
  rows: WinnerRow[];
  totalCount: number;
  page: number;
  sort: SortField;
  order: SortOrder;
  isLoading: boolean;
  loadError: string | null;
};

const initialState: WinnersState = {
  rows: [],
  totalCount: 0,
  page: FIRST_PAGE,
  sort: 'id',
  order: 'ASC',
  isLoading: false,
  loadError: null,
};

const toggleOrder = (order: SortOrder): SortOrder => (order === 'ASC' ? 'DESC' : 'ASC');

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    winnersPageChanged: (state, action: PayloadAction<number>): WinnersState => ({
      ...state,
      page: action.payload,
    }),
    sortToggled: (state, action: PayloadAction<SortField>): WinnersState => ({
      ...state,
      sort: action.payload,
      order: state.sort === action.payload ? toggleOrder(state.order) : 'ASC',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state): WinnersState => ({ ...state, isLoading: true }))
      .addCase(fetchWinners.fulfilled, (state, action): WinnersState => ({
        ...state,
        isLoading: false,
        loadError: null,
        rows: action.payload.items,
        totalCount: action.payload.totalCount,
      }))
      .addCase(fetchWinners.rejected, (state): WinnersState => ({
        ...state,
        isLoading: false,
        loadError: LOAD_ERROR_MESSAGE,
      }));
  },
});

export const { winnersPageChanged, sortToggled } = winnersSlice.actions;

export default winnersSlice.reducer;
