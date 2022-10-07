import { configureStore, combineReducers } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

import userReducer from './user/userSlice';

const persistConfig = {
  key: 'cuidly',
  version: 1,
  storage: localforage,
};

const reducer = combineReducers({
  user: userReducer,
});

const config = {
  blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createStateSyncMiddleware(config)),
});

initMessageListener(store);
