import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AuthSlice from '../slice/authSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const store = configureStore({
    reducer: persistReducer(persistConfig, AuthSlice),
});

export const persistor = persistStore(store);
export default store;