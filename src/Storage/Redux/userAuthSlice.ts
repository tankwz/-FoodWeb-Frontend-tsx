import { createSlice } from '@reduxjs/toolkit';
import { userModel } from '../../Interfaces';

const initialState: userModel = {
  id: '',
  email: '',
  name: '',
  phoneNumber: '',
  address: '',
  role: '',
  exp: 0,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.role = action.payload.role;
      state.exp = action.payload.exp;
    },
  },
});

export const userAuthReducer = userAuthSlice.reducer;
export const { setUser } = userAuthSlice.actions;
