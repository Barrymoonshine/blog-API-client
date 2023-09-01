import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';
import useAppState from './useAppState';

const useAppDispatch = () => {
  const { dispatch } = useContext(AppContext);
  const { blogs } = useAppState();

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      dispatch({
        type: ACTIONS.LOG_IN,
        payload: token,
      });
    }
    // Save blogs in state on page load
    if (!blogs) {
      let isMounted = true;
      if (isMounted) {
        const fetchData = async () => {
          dispatch({
            type: ACTIONS.TOGGLE_LOADING,
          });
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
            dispatch({
              type: ACTIONS.UPDATE_ERROR,
              payload: { err },
            });
          } finally {
            dispatch({
              type: ACTIONS.TOGGLE_LOADING,
            });
          }
        };
        fetchData();
      }
      return () => {
        isMounted = false;
      };
    }
  }, []);

  const logIn = (token) => {
    dispatch({
      type: ACTIONS.LOG_IN,
      payload: { token },
    });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({
      type: ACTIONS.LOG_OUT,
    });
  };

  return {
    logIn,
    logOut,
  };
};

export default useAppDispatch;
