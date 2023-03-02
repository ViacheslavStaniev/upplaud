// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
export const HOST_API_KEY = process.env.REACT_APP_HOST_API_KEY || '';

// CloudFront
export const CLOUDFRONT_URL = process.env.REACT_APP_CLOUDFRONT_URL || '';

// Google MAP
export const MAP_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.guestii.accountAdmin; // as '/dashboard/account-admin'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 54,
  H_DASHBOARD_ITEM_SUB: 40,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
