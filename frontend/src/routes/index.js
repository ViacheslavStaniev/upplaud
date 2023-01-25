import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';

import {
  Page404,
  AddGuest,
  Dashboard,
  LoginPage,
  Automations,
  AccountAdmin,
  EmailTemplate,
  GuestingAdmin,
  PostingTemplate,
} from './elements';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/page',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'account-admin', element: <AccountAdmin /> },
        { path: 'add-guest', element: <AddGuest /> },
        { path: 'automations', element: <Automations /> },
        { path: 'posting-template', element: <PostingTemplate /> },
        { path: 'email-template', element: <EmailTemplate /> },
        { path: 'guesting-admin', element: <GuestingAdmin /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
