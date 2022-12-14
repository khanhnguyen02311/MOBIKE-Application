import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ID: null,
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.ID = action.payload.ID;
      state.token = action.payload.token;
      state.isLoggedIn = state.ID != null && state.token != null
    },
    logout: (state) => {
      state.ID = null;
      state.token = null;
      state.isLoggedIn = false;
    }
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
