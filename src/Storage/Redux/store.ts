import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { menuItemReducers } from './menuItemSlice';

export const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducers,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
