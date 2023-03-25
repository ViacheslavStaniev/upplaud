import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import guestsReducer from './slices/guests';

export const rootPersistConfig = {
  storage,
  key: 'root',
  whitelist: [],
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({ guests: guestsReducer });

export default persistReducer(rootPersistConfig, rootReducer);
