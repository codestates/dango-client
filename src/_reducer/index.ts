import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'

// import signinSlice from './users/signin';

const reducers = combineReducers({
    // signinSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []   // accessToken, refreshToken 담을 예정
}

const rootReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export default store;