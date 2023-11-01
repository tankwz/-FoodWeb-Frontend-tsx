import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});

export const { setCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
