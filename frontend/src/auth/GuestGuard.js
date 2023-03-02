import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../routes/paths';
import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../components/loading-screen';

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) return <Navigate to={PATH_DASHBOARD.guestii.accountAdmin} />;

  if (!isInitialized) return <LoadingScreen />;

  return <> {children} </>;
}
