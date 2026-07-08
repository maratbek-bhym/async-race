import type { FormEvent } from 'react';
import { CAR_NAME_MAX_LENGTH } from '../../constants';
import type { NewCar } from '../../types';

type Props = {
  title: string;
  values: NewCar;
  disabled: boolean;
  onChange: (values: NewCar) => void;
  onSubmit: (values: NewCar) => void;
};

export default function CarForm({ title, values, disabled, onChange, onSubmit }: Props) {
  const trimmedName = values.name.trim();
  const isNameValid = trimmedName.length > 0 && trimmedName.length <= CAR_NAME_MAX_LENGTH;

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (isNameValid) {
      onSubmit({ name: trimmedName, color: values.color });
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <input
        className="car-form__name"
        aria-label={`${title} car name`}
        placeholder="Car name"
        maxLength={CAR_NAME_MAX_LENGTH}
        disabled={disabled}
        value={values.name}
        onChange={(event) => onChange({ ...values, name: event.target.value })}
      />
      <input
        className="car-form__color"
        type="color"
        aria-label={`${title} car color`}
        disabled={disabled}
        value={values.color}
        onChange={(event) => onChange({ ...values, color: event.target.value })}
      />
      <button className="btn btn--primary" type="submit" disabled={disabled || !isNameValid}>
        {title}
      </button>
    </form>
  );
}
