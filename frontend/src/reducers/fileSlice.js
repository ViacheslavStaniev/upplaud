import axios from '../utils/axios';
import { notification } from 'antd';
import { createSlice, current } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'files',
  initialState: { files: [], isLoading: false, isUploading: false },
  reducers: {
    // START LOADING
    startLoading(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    // GET FILES LIST
    onFetchFiles(state, { payload }) {
      return { ...state, files: payload, isLoading: false };
    },
    // ON DELETE FILE
    onDeleteFile(state, { payload }) {
      const { files } = current(state);
      return { ...state, files: files.filter(({ _id }) => _id !== payload) };
    },
    // ON UPLOAD FILES
    onUploadFile(state, { payload }) {
      const { files } = current(state);
      return { ...state, files: [...files, ...payload], isUploading: false };
    },
    // START UPLOADING
    startUploading(state, { payload }) {
      return { ...state, isUploading: payload };
    },
  },
});

export default slice.reducer;

export const { startLoading, startUploading, onFetchFiles, onDeleteFile, onUploadFile } =
  slice.actions;

// Get files list
export const getFiles = () => async (dispatch) => {
  try {
    dispatch(startLoading(true));

    const { data } = await axios.get('files');
    dispatch(onFetchFiles(data));
  } catch (error) {
    dispatch(startLoading(false));
    console.error({ msg: error.message });
  }
};

// Delete a file
export const deleteFile = (id) => async (dispatch) => {
  try {
    await axios.delete(`files/${id}`);
    dispatch(onDeleteFile(id));

    notification.success({ message: 'Success', description: 'File deleted successfully.' });
  } catch (error) {
    console.error({ msg: error.message });
  }
};

// Upload Image(s)
export const uploadImages = (files) => async (dispatch) => {
  try {
    dispatch(startUploading(true));

    const { data } = await axios.post('files/image/bulk', files);
    dispatch(onUploadFile(data));

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
      .post('files/upload2s3', obj)
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

// Upload Audio
export const uploadAudio = (formData) => async (dispatch) => {
  try {
    dispatch(startUploading(true));

    const { data } = await axios.post('files/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(onUploadFile([data]));

    notification.success({ message: 'Success', description: 'Audio saved successfully.' });
  } catch (error) {
    dispatch(startUploading(false));
    console.error({ msg: error.message });
  }
};
