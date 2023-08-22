import axios from '../utils/axios';
import { notification } from 'antd';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'images',
  initialState: { images: [] },
  reducers: {
    // GET IMAGES LIST
    onFetchImages(state, { payload }) {
      return { ...state, images: payload };
    },
  },
});

export default slice.reducer;

export const { onFetchImages } = slice.actions;

// Get images list
export const getImages = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('images');
      dispatch(onFetchImages(data));
      resolve(data);
    } catch (error) {
      console.error({ msg: error.message });
      reject(error);
    }
  });
};

// Delete an image
export const deleteImage = (id) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`images/${id}`);
      notification.success({ message: 'Success', description: 'Image deleted successfully.' });
      resolve();
    } catch (error) {
      console.error({ msg: error.message });
      reject(error);
    }
  });
};

// Upload image(s)
export const uploadImage = (files) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post('images/bulk', files);
      notification.success({ message: 'Success', description: 'Image uploaded successfully.' });
      dispatch(getImages())
      resolve();
    } catch (error) {
      console.error({ msg: error.message });
      reject(error);
    }
  });
};
