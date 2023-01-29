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
  // error
  Page403,
  Page404,
  Page500,
  // dashboard
  AddGuest,
  Dashboard,
  Automations,
  AccountAdmin,
  EmailTemplate,
  GuestingAdmin,
  PostingTemplate,
  // auth
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  NewPasswordPage,
  VerifyCodePage,
  // user
  UserEditPage,
  UserListPage,
  UserCreatePage,
  UserAccountPage,
  UserProfilePage,
  UserCardsPage,
} from './elements';

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    {
      path: '/',
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
        {
          path: 'user',
          children: [
            { element: <Navigate to="/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
