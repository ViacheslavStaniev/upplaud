import { Suspense, lazy } from 'react';
import LoadingScreen from '../components/LoadingScreen';

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
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));
export const ForgotPasswordPage = Loadable(lazy(() => import('../pages/auth/ForgotPasswordPage')));

// DASHBOARD
export const VotingPage = Loadable(lazy(() => import('../pages/dashboard/VotingPage')));
export const Automations = Loadable(lazy(() => import('../pages/dashboard/Automations')));
export const AccountAdmin = Loadable(lazy(() => import('../pages/dashboard/AccountAdmin')));
export const NewAutomation = Loadable(lazy(() => import('../pages/dashboard/NewAutomation')));
export const GuestingAdmin = Loadable(lazy(() => import('../pages/dashboard/GuestingAdmin')));
export const EmailTemplates = Loadable(lazy(() => import('../pages/dashboard/EmailTemplates')));
export const PostingTemplate = Loadable(lazy(() => import('../pages/dashboard/PostingTemplate')));
export const GuestAcceptance = Loadable(lazy(() => import('../pages/dashboard/GuestAcceptance')));

// USERS
// export const UserProfilePage = Loadable(lazy(() => import("../pages/users/UserProfilePage")));
// export const UserCardsPage = Loadable(lazy(() => import("../pages/users/UserCardsPage")));
// export const UserListPage = Loadable(lazy(() => import("../pages/users/UserListPage")));
// export const UserAccountPage = Loadable(lazy(() => import("../pages/users/UserAccountPage")));
// export const UserCreatePage = Loadable(lazy(() => import("../pages/users/UserCreatePage")));
// export const UserEditPage = Loadable(lazy(() => import("../pages/users/UserEditPage")));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
// export const FaqsPage = Loadable(lazy(() => import("../pages/FaqsPage")));
// export const AboutPage = Loadable(lazy(() => import("../pages/AboutPage")));
// export const ContactPage = Loadable(lazy(() => import("../pages/ContactPage")));
