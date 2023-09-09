import axios from '../utils/axios';
import { notification } from 'antd';
import { createSlice, current } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'images',
  initialState: { images: [], isLoading: false, isUploading: false },
  reducers: {
    // START LOADING
    startLoading(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    // GET IMAGES LIST
    onFetchImages(state, { payload }) {
      return { ...state, images: payload, isLoading: false };
    },
    // ON DELETE IMAGE
    onDeleteImage(state, { payload }) {
      const { images } = current(state);
      return { ...state, images: images.filter(({ _id }) => _id !== payload) };
    },
    // ON UPLOAD IMAGES
    onUploadImages(state, { payload }) {
      const { images } = current(state);
      return { ...state, images: [...images, ...payload], isUploading: false };
    },
    // START UPLOADING
    startUploading(state, { payload }) {
      return { ...state, isUploading: payload };
    },
  },
});

export default slice.reducer;

export const { startLoading, startUploading, onFetchImages, onDeleteImage, onUploadImages } =
  slice.actions;

// Get images list
export const getImages = () => async (dispatch) => {
  try {
    dispatch(startLoading(true));

    const { data } = await axios.get('images');
    dispatch(onFetchImages(data));
  } catch (error) {
    dispatch(startLoading(false));
    console.error({ msg: error.message });
  }
};

// Delete an image
export const deleteImage = (id) => async (dispatch) => {
  try {
    await axios.delete(`images/${id}`);
    dispatch(onDeleteImage(id));

    notification.success({ message: 'Success', description: 'Image deleted successfully.' });
  } catch (error) {
    console.error({ msg: error.message });
  }
};

// Upload image(s)
export const uploadImage = (files) => async (dispatch) => {
  try {
    dispatch(startUploading(true));

    const { data } = await axios.post('images/bulk', files);
    dispatch(onUploadImages(data));

    notification.success({ message: 'Success', description: 'Image uploaded successfully.' });
  } catch (error) {
    dispatch(startUploading(false));
    console.error({ msg: error.message });
  }
};

// Upload And Get S3Path
export const uploadAndGetS3Path = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('images/upload2s3', obj)
      .then((result) => resolve(result.data))
      .catch(reject);
  });
};

// Generate Poll Sharing Image
export const generatePollImage = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('guests/generate-poll-image', obj)
      .then((result) => resolve(result.data))
      .catch(reject);
  });
};
