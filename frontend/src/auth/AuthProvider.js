import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { isValidToken, setSession } from './utils';
import { useSelector, useDispatch } from 'react-redux';
import { initialize, saveUser, logoutUser, updateState } from '../reducers/userSlice';
import { createContext, useEffect, useCallback, useMemo, useContext } from 'react';

// AuthContext to keep the latest state
const AuthContext = createContext(null);

// useAuthContext to share this components state everywhere this component is imported
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};

AuthProvider.propTypes = { children: PropTypes.node };

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const onInitialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { data } = await axios.get('/auth/me');

        dispatch(initialize({ isAuthenticated: true, user: data }));
      } else {
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    } catch (error) {
      console.error(error);
      dispatch(initialize({ isAuthenticated: false, user: null }));
    }
  }, [dispatch]);

  useEffect(() => {
    onInitialize();
  }, [onInitialize]);

  // LOGIN
  const login = useCallback(
    async (loginData) => {
      dispatch(updateState({ isLoading: true }));

      try {
        const response = await axios.post('/auth/login', loginData);

        const { accessToken, user } = response.data;

        setSession(accessToken);

        dispatch(saveUser({ user, isLoading: false }));
      } catch (error) {
        dispatch(updateState({ isLoading: false, errors: error?.errors }));
      }
    },
    [dispatch]
  );

  // REGISTER
  const register = useCallback(
    async (userData) => {
      const response = await axios.post('/auth/register', userData);

      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      dispatch(saveUser({ payload: { user } }));
    },
    [dispatch]
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch(logoutUser());
  }, [dispatch]);

  // UPDATE
  const update = useCallback((data) => dispatch(updateState(data)), [dispatch]);

  const memoizedValue = useMemo(
    () => ({
      login,
      logout,
      update,
      register,
      user: state.user,
      errors: state.errors,
      isLoading: state.isLoading,
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
    }),
    [
      login,
      logout,
      update,
      register,
      state.user,
      state.errors,
      state.isLoading,
      state.isInitialized,
      state.isAuthenticated,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
