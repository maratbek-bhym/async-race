import { GARAGE_PAGE_SIZE } from '../constants';
import type { Car, NewCar, PagedResult } from '../types';
import { http, httpPaged } from './http';

const GARAGE_PATH = '/garage';

export const getCars = (page: number): Promise<PagedResult<Car>> =>
  httpPaged<Car>({ path: GARAGE_PATH, query: { _page: page, _limit: GARAGE_PAGE_SIZE } });

export const getCar = (id: number): Promise<Car> => http<Car>({ path: `${GARAGE_PATH}/${id}` });

export const createCar = (car: NewCar): Promise<Car> =>
  http<Car>({ path: GARAGE_PATH, method: 'POST', body: car });

export const updateCar = (id: number, car: NewCar): Promise<Car> =>
  http<Car>({ path: `${GARAGE_PATH}/${id}`, method: 'PUT', body: car });

export const deleteCar = (id: number): Promise<unknown> =>
  http<unknown>({ path: `${GARAGE_PATH}/${id}`, method: 'DELETE' });
