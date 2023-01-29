function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const ROUTES = {
  root: ROOTS_DASHBOARD,
  dashbord: path(ROOTS_DASHBOARD, '/dashboard'),
  accountAdmin: path(ROOTS_DASHBOARD, '/account-admin'),
  addGuest: path(ROOTS_DASHBOARD, '/add-guest'),
  automations: path(ROOTS_DASHBOARD, '/automations'),
  postingTemplate: path(ROOTS_DASHBOARD, '/posting-template'),
  emailTemplate: path(ROOTS_DASHBOARD, '/email-template'),
  guestingAdmin: path(ROOTS_DASHBOARD, '/guesting-admin'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};
