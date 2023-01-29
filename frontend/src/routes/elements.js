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

// ERROR
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));

// USER

export const UserEditPage = Loadable(lazy(() => import('../pages/user/UserEditPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/user/UserListPage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/user/UserCardsPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/user/UserCreatePage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/user/UserAccountPage')));
export const UserProfilePage = Loadable(lazy(() => import('../pages/user/UserProfilePage')));

// DASHBOARD
export const AddGuest = Loadable(lazy(() => import('../pages/AddGuest')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Automations = Loadable(lazy(() => import('../pages/Automations')));
export const AccountAdmin = Loadable(lazy(() => import('../pages/AccountAdmin')));
export const GuestingAdmin = Loadable(lazy(() => import('../pages/GuestingAdmin')));
export const EmailTemplate = Loadable(lazy(() => import('../pages/EmailTemplate')));
export const PostingTemplate = Loadable(lazy(() => import('../pages/PostingTemplate')));
