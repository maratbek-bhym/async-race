import type { RootState } from './store';

export const selectIsRaceRunning = (state: RootState): boolean => state.race.status === 'running';

export const selectIsTrackBusy = (state: RootState): boolean =>
  state.race.status !== 'idle' ||
  Object.values(state.race.cars).some((car) => car.status !== 'idle');
