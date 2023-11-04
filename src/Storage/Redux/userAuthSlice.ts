import { createSlice } from '@reduxjs/toolkit';
import { userModel } from '../../Interfaces';

export const emptyUser: userModel = {
  id: '',
  email: '',
  name: '',
  pickupName: '',
  phoneNumber: '',
  address: '',
  role: '',
  exp: 0,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: emptyUser,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.pickupName = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.role = action.payload.role;
      state.exp = action.payload.exp;
    },
    setUserPick: (state, action) => {
      state.pickupName = action.payload.pickupName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.address = action.payload.address;
    },
  },
});

export const userAuthReducer = userAuthSlice.reducer;
export const { setUser, setUserPick } = userAuthSlice.actions;
