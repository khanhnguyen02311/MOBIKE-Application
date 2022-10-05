import {configureStore} from '@reduxjs/toolkit';
import devToolsEnhancer from 'remote-redux-devtools';
import authReducer from '../slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
