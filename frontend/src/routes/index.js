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
  TermsOfUse,
  PrivacyPolicy,
  // AboutPage,
  // ContactPage,
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  // Dashboard
  VotingPage,
  NewAutomation,
  Automations,
  AccountAdmin,
  GuestingAdmin,
  EmailTemplates,
  PostingTemplate,
  GuestAcceptance,
  UserAutomations,
} from './elements';
import GmailLoading from '../pages/dashboard/GmailLoading';
import OutlookLoading from '../pages/dashboard/OutlookLoading';

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
        { path: 'verify', element: <VerifyCodePage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'reset-password/:token', element: <ResetPasswordPage /> },
      ],
    },
    {
      path: 'gmail',
      children: [
        {
          path: 'callback',
          element: (
            <GmailLoading />
          )
        }]
    },
    {
      path: 'outlook',
      children: [
        {
          path: 'callback',
          element: (
            <OutlookLoading />
          )
        }]
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
        { path: 'automations/new', element: <NewAutomation /> },
        { path: 'automations/:id', element: <NewAutomation /> },
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
        { path: 'terms-of-use', element: <TermsOfUse /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'vote/:userName', element: <UserAutomations /> },
        { path: 'vote/:userName/:pollUniqueId', element: <VotingPage /> },
      ],
    },
    { path: 'guest-acceptance/:userName/:pollUniqueId', element: <GuestAcceptance /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
