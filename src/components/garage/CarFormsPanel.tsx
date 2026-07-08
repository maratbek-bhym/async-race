import { createFormChanged, updateFormChanged } from '../../store/garage/garageSlice';
import { addCar, editCar } from '../../store/garage/garageThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsRaceRunning } from '../../store/selectors';
import type { NewCar } from '../../types';
import CarForm from './CarForm';

export default function CarFormsPanel() {
  const dispatch = useAppDispatch();
  const createForm = useAppSelector((state) => state.garage.createForm);
  const updateForm = useAppSelector((state) => state.garage.updateForm);
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);
  const isRaceRunning = useAppSelector(selectIsRaceRunning);

  const handleCreate = (values: NewCar): void => {
    dispatch(addCar(values));
  };

  const handleUpdate = (values: NewCar): void => {
    if (selectedCarId !== null) {
      dispatch(editCar({ id: selectedCarId, car: values }));
    }
  };

  return (
    <div className="car-forms">
      <CarForm
        title="Create"
        values={createForm}
        disabled={isRaceRunning}
        onChange={(values) => dispatch(createFormChanged(values))}
        onSubmit={handleCreate}
      />
      <CarForm
        title="Update"
        values={updateForm}
        disabled={isRaceRunning || selectedCarId === null}
        onChange={(values) => dispatch(updateFormChanged(values))}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
