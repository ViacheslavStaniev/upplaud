import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { App } from 'antd';
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
  const { user, errors, isLoading, isInitialized, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { message } = App.useApp();

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

  // UPDATE USER
  const updateUser = useCallback(
    async (userData) => {
      try {
        update({ isLoading: true });

        await axios.put('users', userData);

        message.success('User info updated successfully.');
        dispatch(updateState({ user: { ...user, ...userData }, isLoading: false }));
      } catch (error) {
        console.log(error);
        update({ isLoading: false });
        message.error('An error occurred. Please try again.');
      }
    },
    [dispatch, update, user, message]
  );

  // Update Show
  const addUpdateShow = useCallback(
    async (showData, showId) => {
      try {
        update({ isLoading: true });
        if (showId) {
          const { data } = await axios.put(`show/${showId}`, showData);

          message.success('Data updated successfully.');
          dispatch(updateState({ user: { ...user, show: data.show }, isLoading: false }));
        } else {
          const { data } = await axios.post('show', showData);

          message.success('Data updated successfully.');
          dispatch(updateState({ user: { ...user, show: data.show }, isLoading: false }));
        }
      } catch (error) {
        console.log(error);
        update({ isLoading: false });
        message.error('An error occurred. Please try again.');
      }
    },
    [dispatch, update, user, message]
  );

  // Social Login - Login via AuthToken
  const loginViaToken = useCallback(
    (accessToken) => {
      setSession(accessToken);
      onInitialize();
    },
    [onInitialize]
  );

  const memoizedValue = useMemo(
    () => ({
      user,
      login,
      logout,
      update,
      errors,
      register,
      isLoading,
      updateUser,
      loginViaToken,
      addUpdateShow,
      isInitialized,
      isAuthenticated,
    }),
    [
      user,
      login,
      logout,
      update,
      errors,
      register,
      isLoading,
      updateUser,
      loginViaToken,
      addUpdateShow,
      isInitialized,
      isAuthenticated,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
