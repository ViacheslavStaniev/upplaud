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
export const AddGuest = Loadable(lazy(() => import('../pages/add-guest')));
export const Automations = Loadable(lazy(() => import('../pages/automations')));
export const AccountAdmin = Loadable(lazy(() => import('../pages/account-admin')));
export const GuestingAdmin = Loadable(lazy(() => import('../pages/guesting-admin')));
export const EmailTemplates = Loadable(lazy(() => import('../pages/email-templates')));
export const GuestAcceptance = Loadable(lazy(() => import('../pages/guest-acceptance')));
export const PostingTemplate = Loadable(lazy(() => import('../pages/posting-templates')));

// USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/user/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/user/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/user/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/user/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/user/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/user/UserEditPage')));

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
