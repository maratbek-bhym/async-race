import useCarAnimation from '../../hooks/useCarAnimation';
import useCarControls from '../../hooks/useCarControls';
import type { Car } from '../../types';
import CarSvg from './CarSvg';

type Props = {
  car: Car;
};

export default function CarTrack({ car }: Props) {
  const controls = useCarControls(car);
  const { carRef, roadRef } = useCarAnimation(controls.carState);

  return (
    <article className="car-track">
      <div className="car-track__panel">
        <button
          type="button"
          className="btn btn--small"
          disabled={!controls.canEdit}
          onClick={controls.select}
        >
          Select
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger"
          disabled={!controls.canEdit}
          onClick={controls.remove}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn--small btn--engine"
          aria-label={`Start engine of ${car.name}`}
          disabled={!controls.canStart}
          onClick={controls.start}
        >
          A
        </button>
        <button
          type="button"
          className="btn btn--small btn--engine"
          aria-label={`Stop engine of ${car.name}`}
          disabled={!controls.canStop}
          onClick={controls.stop}
        >
          B
        </button>
        <span className="car-track__name">{car.name}</span>
        {controls.carState.status === 'broken' && <span aria-hidden="true">💥</span>}
      </div>
      <div className="car-track__road" ref={roadRef}>
        <div className="car-track__car" ref={carRef}>
          <CarSvg color={car.color} />
        </div>
        <span className="car-track__flag" aria-hidden="true">
          🏁
        </span>
      </div>
    </article>
  );
}
