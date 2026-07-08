import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CAR_COLOR, FIRST_PAGE, LOAD_ERROR_MESSAGE } from '../../constants';
import type { Car, NewCar } from '../../types';
import { addCar, editCar, fetchCars, generateCars, removeCar } from './garageThunks';

type GarageState = {
  cars: Car[];
  totalCount: number;
  page: number;
  refreshToken: number;
  isLoading: boolean;
  loadError: string | null;
  selectedCarId: number | null;
  createForm: NewCar;
  updateForm: NewCar;
};

const EMPTY_FORM: NewCar = { name: '', color: DEFAULT_CAR_COLOR };

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  page: FIRST_PAGE,
  refreshToken: 0,
  isLoading: false,
  loadError: null,
  selectedCarId: null,
  createForm: EMPTY_FORM,
  updateForm: EMPTY_FORM,
};

const refreshed = (state: GarageState): GarageState => ({
  ...state,
  refreshToken: state.refreshToken + 1,
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    garagePageChanged: (state, action: PayloadAction<number>): GarageState => ({
      ...state,
      page: action.payload,
    }),
    carSelected: (state, action: PayloadAction<Car>): GarageState => ({
      ...state,
      selectedCarId: action.payload.id,
      updateForm: { name: action.payload.name, color: action.payload.color },
    }),
    createFormChanged: (state, action: PayloadAction<NewCar>): GarageState => ({
      ...state,
      createForm: action.payload,
    }),
    updateFormChanged: (state, action: PayloadAction<NewCar>): GarageState => ({
      ...state,
      updateForm: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state): GarageState => ({ ...state, isLoading: true }))
      .addCase(fetchCars.fulfilled, (state, action): GarageState => ({
        ...state,
        isLoading: false,
        loadError: null,
        cars: action.payload.items,
        totalCount: action.payload.totalCount,
      }))
      .addCase(fetchCars.rejected, (state): GarageState => ({
        ...state,
        isLoading: false,
        loadError: LOAD_ERROR_MESSAGE,
      }))
      .addCase(addCar.fulfilled, (state): GarageState => ({
        ...refreshed(state),
        createForm: EMPTY_FORM,
      }))
      .addCase(generateCars.fulfilled, (state): GarageState => refreshed(state))
      .addCase(removeCar.fulfilled, (state, action): GarageState => ({
        ...refreshed(state),
        page: action.payload,
        selectedCarId: state.selectedCarId === action.meta.arg.id ? null : state.selectedCarId,
        updateForm: state.selectedCarId === action.meta.arg.id ? EMPTY_FORM : state.updateForm,
      }))
      .addCase(editCar.fulfilled, (state, action): GarageState => ({
        ...state,
        cars: state.cars.map((car) => (car.id === action.payload.id ? action.payload : car)),
        selectedCarId: null,
        updateForm: EMPTY_FORM,
      }));
  },
});

export const { garagePageChanged, carSelected, createFormChanged, updateFormChanged } =
  garageSlice.actions;

export default garageSlice.reducer;
