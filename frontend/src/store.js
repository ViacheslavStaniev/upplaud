import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import guestsSlice from './reducers/guestsSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    guests: guestsSlice,
  },
});
