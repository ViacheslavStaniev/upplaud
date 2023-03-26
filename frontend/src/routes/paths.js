const path = (root, sublink) => `${root}${sublink}`;

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  dashboard: ROOTS_DASHBOARD,
  guestAcceptance: '/guest-acceptance',
};

export const PATH_DASHBOARD = {
  guestii: {
    accountAdmin: path(ROOTS_DASHBOARD, '/account-admin'),
    addGuest: path(ROOTS_DASHBOARD, '/add-guest'),
    automations: path(ROOTS_DASHBOARD, '/automations'),
    emailTemplates: path(ROOTS_DASHBOARD, '/email-templates'),
    guestingAdmin: path(ROOTS_DASHBOARD, '/guesting-admin'),
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
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};
