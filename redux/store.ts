import { configureStore } from '@reduxjs/toolkit';
import linkReducer from './features/link-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    linkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useLinkSelector: TypedUseSelectorHook<RootState> = useSelector;
