const ROOTS_PATH = '/page';

const path = (sublink) => `${ROOTS_PATH}${sublink}`;

export const PATH_AUTH = { login: '/login' };

export const ROUTES = {
  root: ROOTS_PATH,
  dashbord: path('/dashboard'),
  accountAdmin: path('/account-admin'),
  addGuest: path('/add-guest'),
  automations: path('/automations'),
  postingTemplate: path('/posting-template'),
  emailTemplate: path('/email-template'),
  guestingAdmin: path('/guesting-admin'),
};
