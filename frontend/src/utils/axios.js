import axios from 'axios';
import { API_BASEURL } from '../config-global';

const axiosInstance = axios.create({ baseURL: API_BASEURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
