
import { AllEffect, ForkEffect } from 'redux-saga/effects';


type RootSagaType = Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown>;

export type WatcherSaga = Generator<ForkEffect<never>, void, unknown>;

export default function* rootSaga(): RootSagaType {}
