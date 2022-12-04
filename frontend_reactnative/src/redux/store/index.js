import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import loadingReducer from '../slice/loadingSlice';
import imageType from '../clientDatabase/imageType';
import location from '../clientDatabase/location';
import permission from '../clientDatabase/permission';
import filterReducer from '../slice/filterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    locations: location,
    imageTypes: imageType,
    permissions: permission,
    loading: loadingReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
