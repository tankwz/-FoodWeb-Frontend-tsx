import { createSlice } from '@reduxjs/toolkit';
import { cartItemModel, shoppingCartItemModel } from '../../Interfaces';

const initialState: shoppingCartItemModel = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      // Add the selected property to each cart item
      state.cartItems = action.payload?.map((cartItem: cartItemModel) => ({
        ...cartItem,
        selected: false, // You can set the initial value as needed
      }));
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
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
    setSelectedItem: (state, action) => {
      state.cartItems = state.cartItems ?? [];
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.selected = action.payload.selected;
      }
    },
  },
});

export const { setCart, updateQuantity, removeFromCart, setSelectedItem } =
  shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
