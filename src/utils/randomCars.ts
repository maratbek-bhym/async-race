import type { NewCar } from '../types';

const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'BMW',
  'Audi',
  'Toyota',
  'Honda',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Nissan',
  'Mazda',
  'Volvo',
];

const CAR_MODELS = [
  'Model S',
  'Mustang',
  'M5',
  'RS7',
  'Supra',
  'Civic',
  '911 Turbo',
  'Roma',
  'Aventador',
  'GT-R',
  'RX-7',
  'XC90',
];

const HEX_DIGITS = '0123456789abcdef'.split('');
const HEX_COLOR_LENGTH = 6;

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const generateRandomColor = (): string => {
  const digits = Array.from({ length: HEX_COLOR_LENGTH }, () => randomItem(HEX_DIGITS));
  return `#${digits.join('')}`;
};

export const generateRandomCar = (): NewCar => ({
  name: `${randomItem(CAR_BRANDS)} ${randomItem(CAR_MODELS)}`,
  color: generateRandomColor(),
});

export const generateRandomCars = (count: number): NewCar[] =>
  Array.from({ length: count }, generateRandomCar);
