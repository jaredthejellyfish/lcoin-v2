import { combineReducers, configureStore } from '@reduxjs/toolkit';
import transactionSlice from './features/transactionSlice';

const rootReducer = combineReducers({
  transactions: transactionSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
