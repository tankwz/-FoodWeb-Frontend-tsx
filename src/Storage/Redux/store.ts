import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducers } from './menuItemSlice';
import { menuItemApi } from '../../api';

export const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducers,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(menuItemApi.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
