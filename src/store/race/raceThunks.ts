import { createAsyncThunk, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit';
import { driveEngine, startEngine, stopEngine } from '../../api/engineApi';
import { isServerError } from '../../api/http';
import type { Car, RaceWinner } from '../../types';
import { isAbortError, isFulfilledResult, msToSeconds } from '../../utils/helpers';
import { saveWinner } from '../winners/winnersThunks';
import {
  abortAllControllers,
  abortController,
  getActiveCarIds,
  getController,
  isCurrentEpoch,
  nextRaceEpoch,
  registerController,
  releaseController,
} from './raceController';
import {
  carBroken,
  carFinished,
  carReset,
  carRunning,
  carStarted,
  carStopping,
  noWinnerShown,
  raceFinished,
  raceReset,
  raceStarted,
  winnerSet,
} from './raceSlice';

type RaceDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;

type DriveArg = {
  car: Car;
  duration: number;
};

export const prepareCar = createAsyncThunk<number, Car>(
  'race/prepareCar',
  async (car, { dispatch }) => {
    dispatch(carStarted(car.id));
    const controller = registerController(car.id);
    try {
      const { velocity, distance } = await startEngine(car.id, controller.signal);
      return distance / velocity;
    } catch (error) {
      if (!isAbortError(error)) {
        releaseController(car.id);
        dispatch(carReset(car.id));
      }
      throw error;
    }
  },
);

export const driveCar = createAsyncThunk<RaceWinner, DriveArg>(
  'race/driveCar',
  async ({ car, duration }, { dispatch }) => {
    dispatch(carRunning({ id: car.id, duration }));
    const controller = getController(car.id) ?? registerController(car.id);
    try {
      await driveEngine(car.id, controller.signal);
      dispatch(carFinished(car.id));
      return { id: car.id, name: car.name, time: msToSeconds(duration) };
    } catch (error) {
      if (isServerError(error)) {
        dispatch(carBroken(car.id));
      }
      throw error;
    } finally {
      releaseController(car.id);
    }
  },
);

export const runCar = createAsyncThunk<void, Car>('race/runCar', async (car, { dispatch }) => {
  const duration = await dispatch(prepareCar(car)).unwrap();
  await dispatch(driveCar({ car, duration })).unwrap();
});

export const stopCar = createAsyncThunk<void, number>('race/stopCar', async (id, { dispatch }) => {
  dispatch(carStopping(id));
  abortController(id);
  try {
    await stopEngine(id);
  } finally {
    dispatch(carReset(id));
  }
});

const prepareCars = async (cars: Car[], dispatch: RaceDispatch): Promise<DriveArg[]> => {
  const results = await Promise.allSettled(
    cars.map(async (car) => ({ car, duration: await dispatch(prepareCar(car)).unwrap() })),
  );
  return results.filter(isFulfilledResult).map((result) => result.value);
};

export const startRace = createAsyncThunk<void, Car[]>(
  'race/startRace',
  async (cars, { dispatch }) => {
    const epoch = nextRaceEpoch();
    dispatch(raceStarted());
    const prepared = await prepareCars(cars, dispatch);
    const runs = prepared.map((entry) => dispatch(driveCar(entry)).unwrap());
    try {
      const winner = await Promise.any(runs);
      dispatch(winnerSet(winner));
      await dispatch(saveWinner({ id: winner.id, time: winner.time }));
    } catch {
      if (isCurrentEpoch(epoch)) {
        dispatch(noWinnerShown());
      }
    } finally {
      await Promise.allSettled(runs);
      if (isCurrentEpoch(epoch)) {
        dispatch(raceFinished());
      }
    }
  },
);

export const resetRace = createAsyncThunk<void, void>('race/resetRace', async (_, { dispatch }) => {
  nextRaceEpoch();
  const activeIds = getActiveCarIds();
  abortAllControllers();
  dispatch(raceReset());
  await Promise.allSettled(activeIds.map((id) => stopEngine(id)));
});
