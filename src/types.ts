export type Car = {
  id: number;
  name: string;
  color: string;
};

export type NewCar = Omit<Car, 'id'>;

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type WinnerUpdate = Omit<Winner, 'id'>;

export type WinnerRow = Winner & { car: Car };

export type EngineData = {
  velocity: number;
  distance: number;
};

export type DriveResult = {
  success: boolean;
};

export type SortField = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export type CarRaceStatus = 'idle' | 'starting' | 'running' | 'stopping' | 'broken' | 'finished';

export type RaceStatus = 'idle' | 'running' | 'finished';

export type RaceWinner = {
  id: number;
  name: string;
  time: number;
};

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
};
