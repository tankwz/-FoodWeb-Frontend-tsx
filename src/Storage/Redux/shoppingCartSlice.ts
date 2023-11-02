import { createSlice } from '@reduxjs/toolkit';
import { shoppingCartItemModel } from '../../Interfaces';

const initialState: shoppingCartItemModel = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItems.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
