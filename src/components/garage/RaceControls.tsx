import { generateCars } from '../../store/garage/garageThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetRace, startRace } from '../../store/race/raceThunks';
import { selectIsRaceRunning, selectIsTrackBusy } from '../../store/selectors';

export default function RaceControls() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.garage.cars);
  const isTrackBusy = useAppSelector(selectIsTrackBusy);
  const isRaceRunning = useAppSelector(selectIsRaceRunning);

  return (
    <div className="race-controls">
      <button
        type="button"
        className="btn btn--primary"
        disabled={isTrackBusy || cars.length === 0}
        onClick={() => dispatch(startRace(cars))}
      >
        Race 🚦
      </button>
      <button
        type="button"
        className="btn btn--danger"
        disabled={!isTrackBusy}
        onClick={() => dispatch(resetRace())}
      >
        Reset 🔄
      </button>
      <button
        type="button"
        className="btn"
        disabled={isRaceRunning}
        onClick={() => dispatch(generateCars())}
      >
        Generate cars 🎲
      </button>
    </div>
  );
}
