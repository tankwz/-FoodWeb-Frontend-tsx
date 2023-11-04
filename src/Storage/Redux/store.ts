import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducers } from './menuItemSlice';
import { authApi, menuItemApi, orderApi, shoppingCartApi } from '../../api';
import { shoppingCartReducer } from './shoppingCartSlice';
import { userAuthReducer } from './userAuthSlice';

export const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducers,
    shoppingCartStore: shoppingCartReducer,
    userStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(orderApi.middleware),

  // middleware: (getDefaultMiddleWare) =>
  //   getDefaultMiddleWare().concat(menuItemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
