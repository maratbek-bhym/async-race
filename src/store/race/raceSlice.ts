import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CarRaceStatus, RaceStatus, RaceWinner } from '../../types';

export type CarRaceState = {
  status: CarRaceStatus;
  duration: number;
};

export const IDLE_CAR_STATE: CarRaceState = { status: 'idle', duration: 0 };

type RaceSliceState = {
  cars: Record<number, CarRaceState>;
  status: RaceStatus;
  winner: RaceWinner | null;
  isWinnerShown: boolean;
  isNoWinnerShown: boolean;
};

const initialState: RaceSliceState = {
  cars: {},
  status: 'idle',
  winner: null,
  isWinnerShown: false,
  isNoWinnerShown: false,
};

const withCarStatus = (
  state: RaceSliceState,
  id: number,
  status: CarRaceStatus,
  duration?: number,
): RaceSliceState => ({
  ...state,
  cars: {
    ...state.cars,
    [id]: { status, duration: duration ?? (state.cars[id] ?? IDLE_CAR_STATE).duration },
  },
});

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    carStarted: (state, action: PayloadAction<number>): RaceSliceState =>
      withCarStatus(state, action.payload, 'starting', 0),
    carRunning: (state, action: PayloadAction<{ id: number; duration: number }>): RaceSliceState =>
      withCarStatus(state, action.payload.id, 'running', action.payload.duration),
    carFinished: (state, action: PayloadAction<number>): RaceSliceState =>
      withCarStatus(state, action.payload, 'finished'),
    carBroken: (state, action: PayloadAction<number>): RaceSliceState =>
      withCarStatus(state, action.payload, 'broken'),
    carStopping: (state, action: PayloadAction<number>): RaceSliceState =>
      withCarStatus(state, action.payload, 'stopping'),
    carReset: (state, action: PayloadAction<number>): RaceSliceState => {
      const { [action.payload]: removed, ...rest } = state.cars;
      return { ...state, cars: rest };
    },
    raceStarted: (state): RaceSliceState => ({
      ...state,
      status: 'running',
      winner: null,
      isWinnerShown: false,
      isNoWinnerShown: false,
    }),
    raceFinished: (state): RaceSliceState => ({ ...state, status: 'finished' }),
    winnerSet: (state, action: PayloadAction<RaceWinner>): RaceSliceState => ({
      ...state,
      winner: action.payload,
      isWinnerShown: true,
    }),
    noWinnerShown: (state): RaceSliceState => ({ ...state, isNoWinnerShown: true }),
    bannerDismissed: (state): RaceSliceState => ({
      ...state,
      isWinnerShown: false,
      isNoWinnerShown: false,
    }),
    raceReset: (): RaceSliceState => initialState,
  },
});

export const {
  carStarted,
  carRunning,
  carFinished,
  carBroken,
  carStopping,
  carReset,
  raceStarted,
  raceFinished,
  winnerSet,
  noWinnerShown,
  bannerDismissed,
  raceReset,
} = raceSlice.actions;

export default raceSlice.reducer;
