import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garage/garageSlice';
import raceReducer from './race/raceSlice';
import winnersReducer from './winners/winnersSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    race: raceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
