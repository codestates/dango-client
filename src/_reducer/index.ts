import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import user from './user';
import map from './map';

const reducers = combineReducers({
  user,
  map,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 로컬스토리지에 저장할 것만 'user' 등 넣으면됨(문자로) 6번째줄의 import한 이름을 넣으면됨.
};

const rootReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
