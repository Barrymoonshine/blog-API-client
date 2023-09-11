import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AUTH_ACTIONS } from '../utils/ACTIONS';
import { useEffect } from 'react';
import { saveItem, getItem, removeItem } from '../helpers/localStorage';

const useAuthDispatch = () => {
  const { authDispatch } = useContext(AppContext);

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

  const toggleLogIn = () => {
    authDispatch({
      type: AUTH_ACTIONS.TOGGLE_LOG_IN,
    });
  };

  const handleLogIn = (token, username) => {
    saveToken(token);
    saveUsername(username);
    toggleLogIn();
  };

  const handleLogOut = () => {
    removeToken();
    removeUsername();
    toggleLogIn();
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
      } else {
        saveAuthError(data);
      }
    } catch (err) {
      saveAuthError(err);
    } finally {
      toggleAuthLoading();
    }
  };

  // Only run on page-load or page refresh
  useEffect(() => {
    // Check whether token is present and still valid
    console.log('useEffect in useAuthDispatch called');
    const token = getItem('token');
    const verifyToken = async () => {
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
    if (token) {
      verifyToken();
    }
  }, []);

  return {
    handleLogIn,
    handleLogOut,
    toggleLogIn,
    createAuth,
  };
};

export default useAuthDispatch;
