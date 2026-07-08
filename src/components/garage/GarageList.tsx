import { useAppSelector } from '../../store/hooks';
import CarTrack from './CarTrack';

export default function GarageList() {
  const cars = useAppSelector((state) => state.garage.cars);
  const isLoading = useAppSelector((state) => state.garage.isLoading);
  const loadError = useAppSelector((state) => state.garage.loadError);

  if (loadError) {
    return <p className="notice notice--error">{loadError}</p>;
  }
  if (isLoading && cars.length === 0) {
    return <p className="notice">Loading cars…</p>;
  }
  if (cars.length === 0) {
    return <p className="notice">No cars in the garage. Create one or generate random cars 🚗</p>;
  }

  return (
    <div className="garage-list">
      {cars.map((car) => (
        <CarTrack key={car.id} car={car} />
      ))}
    </div>
  );
}
