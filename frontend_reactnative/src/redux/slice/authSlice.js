import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  date: {},
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.date = action.payload;
    },
  },
});

export const {login} = authSlice.actions;

export default authSlice.reducer;
