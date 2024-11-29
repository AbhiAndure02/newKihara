// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import notificationReducer from './notification/notificationSlice'; // Import the new reducer

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer, // Add notifications to the root reducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'notifications'], // Persist both user and notifications state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
