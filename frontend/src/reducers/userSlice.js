import axios from '../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    errors: null,
    isLoading: false,
    isInitialized: false,
    isAuthenticated: false,
  },
  reducers: {
    initialize: (state, { payload }) => {
      const { user, isAuthenticated } = payload;
      return { ...state, user, isLoading: false, isInitialized: true, isAuthenticated };
    },
    saveUser: (state, { payload }) => {
      const { user } = payload;
      return { ...state, user, isLoading: false, isAuthenticated: true };
    },
    logoutUser: (state) => {
      return { ...state, user: null, isLoading: false, isAuthenticated: false };
    },
    updateState: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { initialize, saveUser, logoutUser, updateState } = userSlice.actions;

export default userSlice.reducer;

export const getImages = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('images');
      resolve(result.data);
    } catch (error) {
      console.error({ msg: error.message });
      reject(error);
    }
  });
};
