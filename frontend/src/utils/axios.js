import axios from 'axios';
import { APP_BASEURL } from '../config-global';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${APP_BASEURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status = '', statusText = '', data = '' } = error?.response || {};
    return Promise.reject({ status, statusText, message: data || 'Something went wrong' });
  }
);

export default axiosInstance;
