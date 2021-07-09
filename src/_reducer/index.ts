import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import user from './user';
import map from './map';
import modal from './modalSlice';
import watchOpen from './modalSaga';
import talent from './talent';
import chattings from './chattings';

const reducers = combineReducers({
  user,
  map,
  modal,
  talent,
  chattings,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
function* rootSaga() {
  yield all([watchOpen()]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
