import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { AUTH_TYPE } from '../utils/types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = { user: null, isInitialized: false, isAuthenticated: false };

const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === AUTH_TYPE.INITIAL) {
    return { isInitialized: true, isAuthenticated: payload.isAuthenticated, user: payload.user };
  }

  if (type === AUTH_TYPE.LOGIN) return { ...state, isAuthenticated: true, user: payload.user };

  if (type === AUTH_TYPE.REGISTER) return { ...state, isAuthenticated: true, user: payload.user };

  if (type === AUTH_TYPE.LOGOUT) return { ...state, user: null, isAuthenticated: false };

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = { children: PropTypes.node };

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');

        const { user } = response.data;

        dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: true, user } });
      } else {
        dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: false, user: null } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: AUTH_TYPE.INITIAL, payload: { isAuthenticated: false, user: null } });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axios.post('/api/account/login', { email, password });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({ type: AUTH_TYPE.LOGIN, payload: { user } });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', { email, password, firstName, lastName });

    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({ type: AUTH_TYPE.REGISTER, payload: { user } });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: AUTH_TYPE.LOGOUT });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
