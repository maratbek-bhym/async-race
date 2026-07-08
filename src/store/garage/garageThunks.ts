import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, deleteCar, getCars, updateCar } from '../../api/garageApi';
import { deleteWinner } from '../../api/winnersApi';
import { RANDOM_CARS_COUNT } from '../../constants';
import type { Car, NewCar, PagedResult } from '../../types';
import { generateRandomCars } from '../../utils/randomCars';

export const fetchCars = createAsyncThunk<PagedResult<Car>, number>('garage/fetchCars', (page) =>
  getCars(page),
);

export const addCar = createAsyncThunk<Car, NewCar>('garage/addCar', (car) => createCar(car));

type EditCarArg = {
  id: number;
  car: NewCar;
};

export const editCar = createAsyncThunk<Car, EditCarArg>('garage/editCar', ({ id, car }) =>
  updateCar(id, car),
);

type RemoveCarArg = {
  id: number;
  targetPage: number;
};

export const removeCar = createAsyncThunk<number, RemoveCarArg>(
  'garage/removeCar',
  async ({ id, targetPage }) => {
    await deleteCar(id);
    await deleteWinner(id);
    return targetPage;
  },
);

export const generateCars = createAsyncThunk<void, void>('garage/generateCars', async () => {
  await Promise.all(generateRandomCars(RANDOM_CARS_COUNT).map((car) => createCar(car)));
});
