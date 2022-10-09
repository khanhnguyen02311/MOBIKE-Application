import {createSlice} from '@reduxjs/toolkit';
import { signIn } from '../../backendAPI/database';

const initialState = {
  UID: null,
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.UID = action.payload.UID;
      state.token = action.payload.token;
      state.isLoggedIn = state.UID != null && state.token != null
    },
    logout: (state) => {
      state.UID = null;
      state.token = null;
      state.isLoggedIn = false;
    }
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
