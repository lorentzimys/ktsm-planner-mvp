import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { wizardSlice } from './wizard/slice';

export type TAppStore = typeof store;

export const store = configureStore({
  reducer: {
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
