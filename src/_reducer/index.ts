import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import user from './user';
import map from './map';
import modal from './modal';
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

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
