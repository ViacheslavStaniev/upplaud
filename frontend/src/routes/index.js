import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// import MainLayout from "../layouts/MainLayout";
import CompactLayout from '../layouts/CompactLayout';
import DashboardLayout from '../layouts/DashboardLayout';
// import { PATH_AFTER_LOGIN } from "../config-global";
import { Navigate, useRoutes } from 'react-router-dom';

import {
  // Error
  Page403,
  Page404,
  Page500,
  // // Main
  // HomePage,
  // FaqsPage,
  // AboutPage,
  // ContactPage,
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard
  NewAutomation,
  Automations,
  AccountAdmin,
  GuestingAdmin,
  EmailTemplates,
  PostingTemplate,
  GuestAcceptance,
} from './elements';

export default function Router() {
  return useRoutes([
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
            { path: 'verify', element: <VerifyCodePage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'reset-password', element: <ResetPasswordPage /> },
          ],
        },
      ],
    },
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <AccountAdmin />, index: true },
        // { path: "account-admin", element: <AccountAdmin /> },
        { path: 'automations', element: <Automations /> },
        { path: 'new-automation', element: <NewAutomation /> },
        { path: 'new-automation/:id', element: <NewAutomation /> },
        { path: 'guesting-admin', element: <GuestingAdmin /> },
        { path: 'email-templates', element: <EmailTemplates /> },
        { path: 'posting-template', element: <PostingTemplate /> },
        // {
        //   path: "user",
        //   children: [
        //     { element: <Navigate to='/dashboard/user/profile' replace />, index: true },
        //     { path: "profile", element: <UserProfilePage /> },
        //     { path: "cards", element: <UserCardsPage /> },
        //     { path: "list", element: <UserListPage /> },
        //     { path: "new", element: <UserCreatePage /> },
        //     { path: ":name/edit", element: <UserEditPage /> },
        //     { path: "account", element: <UserAccountPage /> },
        //   ],
        // },
      ],
    },
    // {
    //   element: <MainLayout />,
    //   children: [
    //     { element: <HomePage />, index: true },
    // { path: "faqs", element: <FaqsPage /> },
    // { path: "about-us", element: <AboutPage /> },
    // { path: "contact-us", element: <ContactPage /> },
    // ],
    // },
    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: 'guest-acceptance/:guestId', element: <GuestAcceptance /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
