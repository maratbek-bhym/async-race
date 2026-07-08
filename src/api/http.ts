import { BASE_URL, HTTP_INTERNAL_ERROR, HTTP_NOT_FOUND } from '../constants';
import type { PagedResult } from '../types';

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export const isNotFoundError = (error: unknown): boolean =>
  error instanceof HttpError && error.status === HTTP_NOT_FOUND;

export const isServerError = (error: unknown): boolean =>
  error instanceof HttpError && error.status === HTTP_INTERNAL_ERROR;

type QueryValue = string | number;

type RequestOptions = {
  path: string;
  method?: string;
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
};

const buildUrl = ({ path, query }: RequestOptions): string => {
  const url = new URL(path, BASE_URL);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.toString();
};

const buildInit = ({ method, body, signal }: RequestOptions): RequestInit => ({
  method: method ?? 'GET',
  signal,
  ...(body === undefined
    ? {}
    : { body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
});

const fetchOrThrow = async (options: RequestOptions): Promise<Response> => {
  const response = await fetch(buildUrl(options), buildInit(options));
  if (!response.ok) {
    throw new HttpError(response.status, await response.text());
  }
  return response;
};

export const http = async <T>(options: RequestOptions): Promise<T> => {
  const response = await fetchOrThrow(options);
  return (await response.json()) as T;
};

export const httpPaged = async <T>(options: RequestOptions): Promise<PagedResult<T>> => {
  const response = await fetchOrThrow(options);
  const totalCount = Number(response.headers.get('X-Total-Count') ?? '0');
  return { items: (await response.json()) as T[], totalCount };
};
