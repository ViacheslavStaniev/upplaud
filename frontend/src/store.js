import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import guestsSlice from './reducers/guestsSlice';
import imageSlice from './reducers/imageSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    guests: guestsSlice,
    images: imageSlice,
  },
});
