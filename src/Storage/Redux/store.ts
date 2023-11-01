import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducers } from './menuItemSlice';
import { menuItemApi, shoppingCartApi } from '../../api';

export const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducers,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
  // middleware: (getDefaultMiddleWare) =>
  //   getDefaultMiddleWare().concat(menuItemApi.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
