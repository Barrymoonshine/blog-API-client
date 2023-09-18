import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AUTH_ACTIONS } from '../utils/ACTIONS';
import { saveItem, getItem, removeItem } from '../helpers/localStorage';

const useAuthDispatch = () => {
  const { authState, authDispatch } = useContext(AppContext);

  const saveToken = (token) => {
    saveItem('token', token);
    authDispatch({
      type: AUTH_ACTIONS.SAVE_TOKEN,
      payload: { token },
    });
  };

  const saveUsername = (username) => {
    saveItem('username', username);
    authDispatch({
      type: AUTH_ACTIONS.SAVE_USERNAME,
      payload: { username },
    });
  };

  const removeToken = () => {
    removeItem('token');
    authDispatch({
      type: AUTH_ACTIONS.REMOVE_TOKEN,
    });
  };

  const removeUsername = () => {
    removeItem('username');
    authDispatch({
      type: AUTH_ACTIONS.REMOVE_USERNAME,
    });
  };

  const logIn = () => {
    authDispatch({
      type: AUTH_ACTIONS.LOG_IN,
    });
  };

  const logOut = () => {
    authDispatch({
      type: AUTH_ACTIONS.LOG_OUT,
    });
  };

  const handleLogIn = (token, username) => {
    saveToken(token);
    saveUsername(username);
    logIn();
  };

  const handleLogOut = () => {
    removeToken();
    removeUsername();
    logOut();
  };

  const toggleAuthLoading = () => {
    authDispatch({
      type: AUTH_ACTIONS.TOGGLE_AUTH_LOADING,
    });
  };

  const removeAuthError = () => {
    authDispatch({
      type: AUTH_ACTIONS.REMOVE_AUTH_ERROR,
    });
  };

  const saveAuthError = (error) => {
    authDispatch({
      type: AUTH_ACTIONS.SAVE_AUTH_ERROR,
      payload: { error },
    });
  };

  const createAuth = async (url, options) => {
    toggleAuthLoading();
    removeAuthError();
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        handleLogIn(data.token, JSON.parse(options.body).username);
        toggleAuthLoading();
        return true;
      } else {
        console.log('authError', data);
        toggleAuthLoading();
        saveAuthError(data);
        return false;
      }
    } catch (err) {
      saveAuthError(err);
      return false;
    }
  };

  const verifyToken = async (token) => {
    const response = await fetch(
      'https://ancient-water-2934.fly.dev/user/authenticate',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const username = getItem('username');
      handleLogIn(token, username);
    } else {
      // Remove any data in local storage
      handleLogOut();
    }
  };

  const checkAuthStatus = () => {
    const token = getItem('token');
    if (token) {
      verifyToken(token);
    }
  };

  const getAuthStatus = () => authState.isLoggedIn;

  const updateUsername = async (payload, token) => {
    try {
      removeAuthError();
      toggleAuthLoading();
      const response = await fetch(
        'https://ancient-water-2934.fly.dev/user/log-in',
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        saveUsername(payload.newUsername);
        toggleAuthLoading();
        return true;
      } else {
        const data = await response.json();
        saveAuthError(data);
        toggleAuthLoading();
        return false;
      }
    } catch (error) {
      saveAuthError(error);
      toggleAuthLoading();
      return false;
    }
  };

  return {
    handleLogIn,
    handleLogOut,
    createAuth,
    checkAuthStatus,
    removeAuthError,
    getAuthStatus,
    updateUsername,
  };
};

export default useAuthDispatch;
