import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  // GeneralAppPage,
  // GeneralFilePage,
  // GeneralBankingPage,
  // GeneralBookingPage,
  // GeneralEcommercePage,
  // GeneralAnalyticsPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Ecommerce
  // EcommerceShopPage,
  // EcommerceCheckoutPage,
  // EcommerceProductListPage,
  // EcommerceProductEditPage,
  // EcommerceProductCreatePage,
  // EcommerceProductDetailsPage,
  // Dashboard: Invoice
  // InvoiceListPage,
  // InvoiceDetailsPage,
  // InvoiceCreatePage,
  // InvoiceEditPage,
  // Dashboard: Blog
  // BlogPostsPage,
  // BlogPostPage,
  // BlogNewPostPage,
  // Dashboard: FileManager
  // FileManagerPage,
  // Dashboard: App
  // ChatPage,
  // MailPage,
  // CalendarPage,
  // KanbanPage,
  //
  // BlankPage,
  // PermissionDeniedPage,
  //
  Page500,
  Page403,
  Page404,
  HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
  // guestii
  AddGuest,
  Automations,
  AccountAdmin,
  GuestingAdmin,
  EmailTemplates,
  PostingTemplate,
} from './elements';

// ----------------------------------------------------------------------

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
      path: 'dashboard',
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

        // { path: 'app', element: <GeneralAppPage /> },
        // { path: 'ecommerce', element: <GeneralEcommercePage /> },
        // { path: 'analytics', element: <GeneralAnalyticsPage /> },
        // { path: 'banking', element: <GeneralBankingPage /> },
        // { path: 'booking', element: <GeneralBookingPage /> },
        // { path: 'file', element: <GeneralFilePage /> },
        // {
        //   path: 'e-commerce',
        //   children: [
        //     { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
        //     { path: 'shop', element: <EcommerceShopPage /> },
        //     { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
        //     { path: 'list', element: <EcommerceProductListPage /> },
        //     { path: 'product/new', element: <EcommerceProductCreatePage /> },
        //     { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
        //     { path: 'checkout', element: <EcommerceCheckoutPage /> },
        //   ],
        // },
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
        // {
        //   path: 'invoice',
        //   children: [
        //     { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
        //     { path: 'list', element: <InvoiceListPage /> },
        //     { path: ':id', element: <InvoiceDetailsPage /> },
        //     { path: ':id/edit', element: <InvoiceEditPage /> },
        //     { path: 'new', element: <InvoiceCreatePage /> },
        //   ],
        // },
        // {
        //   path: 'blog',
        //   children: [
        //     { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
        //     { path: 'posts', element: <BlogPostsPage /> },
        //     { path: 'post/:title', element: <BlogPostPage /> },
        //     { path: 'new', element: <BlogNewPostPage /> },
        //   ],
        // },
        // { path: 'files-manager', element: <FileManagerPage /> },
        // {
        //   path: 'mail',
        //   children: [
        //     { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
        //     { path: 'label/:customLabel', element: <MailPage /> },
        //     { path: 'label/:customLabel/:mailId', element: <MailPage /> },
        //     { path: ':systemLabel', element: <MailPage /> },
        //     { path: ':systemLabel/:mailId', element: <MailPage /> },
        //   ],
        // },
        // {
        //   path: 'chat',
        //   children: [
        //     { element: <ChatPage />, index: true },
        //     { path: 'new', element: <ChatPage /> },
        //     { path: ':conversationKey', element: <ChatPage /> },
        //   ],
        // },
        // { path: 'calendar', element: <CalendarPage /> },
        // { path: 'kanban', element: <KanbanPage /> },
        // { path: 'permission-denied', element: <PermissionDeniedPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
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
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
