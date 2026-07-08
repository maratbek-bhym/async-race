import type { DriveResult, EngineData } from '../types';
import { http } from './http';

const ENGINE_PATH = '/engine';

export const startEngine = (id: number, signal: AbortSignal): Promise<EngineData> =>
  http<EngineData>({
    path: ENGINE_PATH,
    method: 'PATCH',
    query: { id, status: 'started' },
    signal,
  });

export const stopEngine = (id: number): Promise<EngineData> =>
  http<EngineData>({ path: ENGINE_PATH, method: 'PATCH', query: { id, status: 'stopped' } });

export const driveEngine = (id: number, signal: AbortSignal): Promise<DriveResult> =>
  http<DriveResult>({ path: ENGINE_PATH, method: 'PATCH', query: { id, status: 'drive' }, signal });
