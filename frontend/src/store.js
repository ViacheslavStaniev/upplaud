// store.js  
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import fileSlice from './reducers/fileSlice';
import userSlice from './reducers/userSlice';
import guestsSlice from './reducers/guestsSlice';
import emailsSlice from './reducers/emailsSlice';

// Persist config for emails reducer  
const emailsPersistConfig = {
  key: 'emails',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  files: fileSlice,
  guests: guestsSlice,
  emails: persistReducer(emailsPersistConfig, emailsSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };