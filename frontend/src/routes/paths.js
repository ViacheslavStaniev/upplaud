const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

const path = (root, sublink) => `${root}${sublink}`;

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  verify: path(ROOTS_AUTH, '/verify'),
  register: path(ROOTS_AUTH, '/register'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  about: '/about-us',
  contact: '/contact-us',
  dashboard: ROOTS_DASHBOARD,
};

export const PATH_DASHBOARD = {
  root: path(ROOTS_DASHBOARD, '/'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  dashboard: {
    automations: path(ROOTS_DASHBOARD, '/automations'),
    accountAdmin: path(ROOTS_DASHBOARD, '/account-admin'),
    guestingAdmin: path(ROOTS_DASHBOARD, '/guesting-admin'),
    newAutomation: path(ROOTS_DASHBOARD, '/new-automation'),
    emailTemplates: path(ROOTS_DASHBOARD, '/email-templates'),
    postingTemplate: path(ROOTS_DASHBOARD, '/posting-template'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },
};
