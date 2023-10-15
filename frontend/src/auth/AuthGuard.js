import { useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from '../pages/auth/LoginPage';
import LoadingScreen from '../components/LoadingScreen';

AuthGuard.propTypes = { children: PropTypes.node };

export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  const { isAuthenticated, isInitialized } = useAuthContext();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) return <LoadingScreen />;

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);

    return <LoginPage />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
