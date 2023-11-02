import { configureStore } from '@reduxjs/toolkit';
import { menuItemReducers } from './menuItemSlice';
import { authApi, menuItemApi, shoppingCartApi } from '../../api';
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
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware),
  // middleware: (getDefaultMiddleWare) =>
  //   getDefaultMiddleWare().concat(menuItemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
