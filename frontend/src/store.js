import { configureStore } from '@reduxjs/toolkit';
import fileSlice from './reducers/fileSlice';
import userSlice from './reducers/userSlice';
import guestsSlice from './reducers/guestsSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    files: fileSlice,
    guests: guestsSlice,
  },
});
