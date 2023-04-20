import { PATH_DASHBOARD } from './routes/paths';

const { REACT_APP_API_BASEURL, REACT_APP_CLOUDFRONT_URL } = process.env;

// API
export const API_BASEURL = REACT_APP_API_BASEURL || '';

// CloudFront
export const CLOUDFRONT_URL = REACT_APP_CLOUDFRONT_URL || '';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard.accountAdmin; // as '/account-admin'
