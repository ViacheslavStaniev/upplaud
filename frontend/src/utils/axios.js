import axios from 'axios';
import { APP_BASEURL } from '../config-global';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${APP_BASEURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
