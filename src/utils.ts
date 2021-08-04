import { combineReducers } from 'redux';

export const createSagaInjector = (runSaga: any, rootSaga: any) => {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = (key: string) => injectedSagas.has(key);

  const injectSaga = (key: string, saga: any) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga('root', rootSaga);

  return injectSaga;
};

export const createReducer = (asyncReducers: any) =>
  combineReducers({
    ...asyncReducers,
  });