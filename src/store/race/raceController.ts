const controllers = new Map<number, AbortController>();
let raceEpoch = 0;

export const registerController = (id: number): AbortController => {
  controllers.get(id)?.abort();
  const controller = new AbortController();
  controllers.set(id, controller);
  return controller;
};

export const getController = (id: number): AbortController | undefined => controllers.get(id);

export const releaseController = (id: number): void => {
  controllers.delete(id);
};

export const abortController = (id: number): void => {
  controllers.get(id)?.abort();
  controllers.delete(id);
};

export const getActiveCarIds = (): number[] => Array.from(controllers.keys());

export const abortAllControllers = (): void => {
  controllers.forEach((controller) => controller.abort());
  controllers.clear();
};

export const nextRaceEpoch = (): number => {
  raceEpoch += 1;
  return raceEpoch;
};

export const isCurrentEpoch = (epoch: number): boolean => epoch === raceEpoch;
