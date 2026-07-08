const DEFAULT_BASE_URL = 'http://127.0.0.1:3000';
const envBaseUrl: unknown = import.meta.env.VITE_API_URL;

export const BASE_URL: string =
  typeof envBaseUrl === 'string' && envBaseUrl.length > 0 ? envBaseUrl : DEFAULT_BASE_URL;

export const GARAGE_PAGE_SIZE = 7;
export const WINNERS_PAGE_SIZE = 10;
export const RANDOM_CARS_COUNT = 100;
export const CAR_NAME_MAX_LENGTH = 30;
export const FIRST_PAGE = 1;
export const MS_IN_SECOND = 1000;
export const TIME_DECIMALS = 2;
export const HTTP_NOT_FOUND = 404;
export const HTTP_INTERNAL_ERROR = 500;
export const DEFAULT_CAR_COLOR = '#4f9dff';
export const FIRST_WIN_COUNT = 1;
export const LOAD_ERROR_MESSAGE =
  'Failed to load data. Make sure the server is running on port 3000.';
