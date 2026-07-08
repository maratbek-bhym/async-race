import { FIRST_PAGE } from '../constants';
import { carSelected } from '../store/garage/garageSlice';
import { removeCar } from '../store/garage/garageThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IDLE_CAR_STATE, type CarRaceState } from '../store/race/raceSlice';
import { runCar, stopCar } from '../store/race/raceThunks';
import { selectIsRaceRunning } from '../store/selectors';
import type { Car } from '../types';

type CarControls = {
  carState: CarRaceState;
  canStart: boolean;
  canStop: boolean;
  canEdit: boolean;
  start: () => void;
  stop: () => void;
  select: () => void;
  remove: () => void;
};

export default function useCarControls(car: Car): CarControls {
  const dispatch = useAppDispatch();
  const carState = useAppSelector((state) => state.race.cars[car.id] ?? IDLE_CAR_STATE);
  const isRaceRunning = useAppSelector(selectIsRaceRunning);
  const page = useAppSelector((state) => state.garage.page);
  const carsOnPage = useAppSelector((state) => state.garage.cars.length);

  const remove = (): void => {
    const isLastOnPage = carsOnPage === 1 && page > FIRST_PAGE;
    dispatch(removeCar({ id: car.id, targetPage: isLastOnPage ? page - 1 : page }));
  };

  const isIdle = carState.status === 'idle';
  const isTransitioning = carState.status === 'starting' || carState.status === 'stopping';

  return {
    carState,
    canStart: isIdle && !isRaceRunning,
    canStop: !isIdle && !isTransitioning && !isRaceRunning,
    canEdit: isIdle && !isRaceRunning,
    start: () => {
      dispatch(runCar(car));
    },
    stop: () => {
      dispatch(stopCar(car.id));
    },
    select: () => {
      dispatch(carSelected(car));
    },
    remove,
  };
}
