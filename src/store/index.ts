import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { dataSlice } from './dataSlice';
import { wizardSlice } from './wizardSlice';

export type TAppStore = typeof store;

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    wizard: wizardSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
