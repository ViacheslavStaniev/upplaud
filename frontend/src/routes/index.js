import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
import { PATH_AFTER_LOGIN } from '../config-global';

import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Error
  Page500,
  Page403,
  Page404,
  // HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  // guestii
  AddGuest,
  Automations,
  AccountAdmin,
  GuestingAdmin,
  EmailTemplates,
  GuestAcceptance,
  PostingTemplate,
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

    // Dashboard
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'account-admin', element: <AccountAdmin /> },
        { path: 'add-guest', element: <AddGuest /> },
        { path: 'automations', element: <Automations /> },
        { path: 'email-templates', element: <EmailTemplates /> },
        { path: 'guesting-admin', element: <GuestingAdmin /> },
        { path: 'posting-template', element: <PostingTemplate /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
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

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        // { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },
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
    { path: 'guest-acceptance/:userId', element: <GuestAcceptance /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
