import { createStore, applyMiddleware, Reducer, Action, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";
import { createReducer, createSagaInjector } from "./utils";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const sagaMiddleWare = createSagaMiddleware();

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(() => {}, 
                        composeEnhancers(applyMiddleware(sagaMiddleWare)));

  const injectSaga = createSagaInjector(sagaMiddleWare.run, rootSaga);

  // Create an object for any later reducers
  const asyncReducers: Record<string, unknown> = {};
  const resetReducers = () => store.replaceReducer(createReducer(asyncReducers) as unknown as Reducer<void & {}, Action<any>>);

  const injectReducer = (key: string, reducer: unknown) => {
    // Updates the aysncReducers object. This ensures we don't remove any old
    // reducers when adding new ones.
      asyncReducers[key] = reducer;
    // This is the key part: replaceReducer updates the reducer
    // See rootReducer.createReducer for more details, but it returns a function.
    resetReducers();
    return store;
  };
  return {...store, injectSaga, injectReducer};  
};



export default configureStore;
