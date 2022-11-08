import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import imageTypeReducer from '../clientDatabase/imageType';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    imageTypes: imageTypeReducer,
  },
});

