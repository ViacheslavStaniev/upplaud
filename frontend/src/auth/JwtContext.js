import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
import { isValidToken, setSession } from './utils';
import { AUTH_TYPE } from '../utils/types';

const initialState = { user: null, isInitialized: false, isAuthenticated: false };

const reducer = (state, action) => {
  const { type, payload } = action;

  // add displayname attr
  if (payload && payload.user) {
    const { firstName, lastName = '' } = payload.user;
    payload.user.displayName = `${firstName} ${lastName}`;
  }

  if (type === AUTH_TYPE.INITIAL) {
    return { isInitialized: true, isAuthenticated: payload.isAuthenticated, user: payload.user };
  }

  if (type === AUTH_TYPE.LOGIN) return { ...state, isAuthenticated: true, user: payload.user };

  if (type === AUTH_TYPE.REGISTER) return { ...state, isAuthenticated: true, user: payload.user };

  if (type === AUTH_TYPE.LOGOUT) return { ...state, user: null, isAuthenticated: false };

  if (type === AUTH_TYPE.UPDATE) return { ...state, user: { ...state.user, ...payload.user } };

  return state;
};

export const AuthContext = createContext(null);

AuthProvider.propTypes = { children: PropTypes.node };

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { data } = await axios.get('auth/me');

        dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: true, user: data } });
      } else {
        dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: false, user: null } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: false, user: null } });
    }
  }, [storageAvailable]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axios.post('auth/login', { email, password });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({ type: AUTH_TYPE.LOGIN, payload: { user } });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post('auth/register', {
      email,
      password,
      firstName,
      lastName,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({ type: AUTH_TYPE.REGISTER, payload: { user } });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: AUTH_TYPE.LOGOUT });
  }, []);

  // UPDATE
  const updateUser = useCallback(async (userData) => {
    try {
      await axios.put('users', userData);
      dispatch({ type: AUTH_TYPE.UPDATE, payload: { user: userData } });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      logout,
      register,
      fetchUser,
      updateUser,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      fetchUser,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
