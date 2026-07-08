import { useEffect } from 'react';
import { GARAGE_PAGE_SIZE } from '../../constants';
import { garagePageChanged } from '../../store/garage/garageSlice';
import { fetchCars } from '../../store/garage/garageThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetRace } from '../../store/race/raceThunks';
import { selectIsTrackBusy } from '../../store/selectors';
import { getTotalPages } from '../../utils/helpers';
import Pagination from '../Pagination';
import WinnerBanner from '../WinnerBanner';
import CarFormsPanel from './CarFormsPanel';
import GarageList from './GarageList';
import RaceControls from './RaceControls';

export default function GaragePage() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.page);
  const totalCount = useAppSelector((state) => state.garage.totalCount);
  const refreshToken = useAppSelector((state) => state.garage.refreshToken);
  const isTrackBusy = useAppSelector(selectIsTrackBusy);

  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page, refreshToken]);

  useEffect(
    () => () => {
      dispatch(resetRace());
    },
    [dispatch],
  );

  return (
    <section className="garage">
      <h2 className="view-title">Garage ({totalCount})</h2>
      <CarFormsPanel />
      <RaceControls />
      <GarageList />
      <Pagination
        page={page}
        totalPages={getTotalPages(totalCount, GARAGE_PAGE_SIZE)}
        disabled={isTrackBusy}
        onPageChange={(newPage) => dispatch(garagePageChanged(newPage))}
      />
      <WinnerBanner />
    </section>
  );
}
