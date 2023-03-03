import { Suspense, lazy } from 'react';
import LoadingScreen from '../components/loading-screen';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// Guestii
export const Automations = Loadable(lazy(() => import('../pages/automations')));
export const AddGuest = Loadable(lazy(() => import('../pages/guestii/AddGuest')));
export const AccountAdmin = Loadable(lazy(() => import('../pages/guestii/AccountAdmin')));
export const GuestingAdmin = Loadable(lazy(() => import('../pages/guestii/GuestingAdmin')));
export const EmailTemplates = Loadable(lazy(() => import('../pages/guestii/EmailTemplates')));
export const PostingTemplate = Loadable(lazy(() => import('../pages/guestii/PostingTemplate')));

// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const PricingPage = Loadable(lazy(() => import('../pages/PricingPage')));
export const PaymentPage = Loadable(lazy(() => import('../pages/PaymentPage')));
