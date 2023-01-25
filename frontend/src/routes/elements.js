import { Suspense, lazy } from 'react';
import LoadingScreen from '../components/loading-screen';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const AddGuest = Loadable(lazy(() => import('../pages/AddGuest')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Automations = Loadable(lazy(() => import('../pages/Automations')));
export const AccountAdmin = Loadable(lazy(() => import('../pages/AccountAdmin')));
export const GuestingAdmin = Loadable(lazy(() => import('../pages/GuestingAdmin')));
export const EmailTemplate = Loadable(lazy(() => import('../pages/EmailTemplate')));
export const PostingTemplate = Loadable(lazy(() => import('../pages/PostingTemplate')));
