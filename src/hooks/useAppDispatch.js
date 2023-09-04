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
    const user = JSON.parse(localStorage.getItem('user'));
    // const username = JSON.parse(localStorage.getItem('username'));

    if (user) {
      const isTokenExpired = async () => {
        const response = await fetch(
          'https://ancient-water-2934.fly.dev/user/authenticate',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        // Only load the user's token into state if it hasn't expired
        if (response.ok) {
          console.log('response ok, user', user);
          dispatch({
            type: ACTIONS.LOG_IN,
            payload: { user },
          });
        } else {
          console.log(data);
        }
      };
      isTokenExpired();
    }

    // dispatch({
    //   type: ACTIONS.SET_USERNAME,
    //   payload: username,
    // });

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

  const logIn = (json) => {
    dispatch({
      type: ACTIONS.LOG_IN,
      payload: json,
    });
  };

  const logOut = () => {
    localStorage.removeItem('user');
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
