import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';
import useAppState from './useAppState';
import { getItem, removeItem } from '../helpers/localStorage';

const useAppDispatch = () => {
  const { state, dispatch } = useContext(AppContext);
  const { blogs } = useAppState();

  const logIn = (token) => {
    dispatch({
      type: ACTIONS.LOG_IN,
      payload: { token },
    });
  };

  const toggleLoading = () => {
    dispatch({
      type: ACTIONS.TOGGLE_LOADING,
    });
  };

  const updateError = (err) => {
    dispatch({
      type: ACTIONS.UPDATE_ERROR,
      payload: { err },
    });
  };

  const logOut = () => {
    removeItem('token');
    dispatch({
      type: ACTIONS.LOG_OUT,
    });
  };

  const saveComments = (comments) => {
    // Allow for initial update to comments value of null
    const newComments = state.comments
      ? [...state.comments, comments]
      : comments;
    console.log('newComments', newComments);
    dispatch({
      type: ACTIONS.SAVE_COMMENTS,
      payload: { newComments },
    });
  };

  // Only run on page-load
  useEffect(() => {
    // Check whether token is present and still valid
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
        logIn(token);
      }
    };
    if (token) {
      verifyToken();
    }

    // Save blogs
    if (!blogs) {
      let isMounted = true;
      if (isMounted) {
        const fetchData = async () => {
          toggleLoading();
          try {
            const response = await fetch(
              'https://ancient-water-2934.fly.dev/blogs',
              { method: 'GET' }
            );
            const blogs = await response.json();
            dispatch({
              type: ACTIONS.SAVE_BLOGS,
              payload: { blogs },
            });
          } catch (err) {
            updateError(err);
          } finally {
            toggleLoading();
          }
        };
        fetchData();
      }
      return () => {
        isMounted = false;
      };
    }
  }, []);

  return {
    logIn,
    toggleLoading,
    updateError,
    logOut,
    saveComments,
  };
};

export default useAppDispatch;
