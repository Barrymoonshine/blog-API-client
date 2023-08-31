import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';

const useAppDispatch = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      console.log('existing user in local storage', token);
      dispatch({
        type: ACTIONS.LOG_IN,
        payload: token,
      });
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

  const saveBlogs = (blogs) => {
    console.log('Blogs are saved to state', blogs);
    dispatch({
      type: ACTIONS.SAVE_BLOGS,
      payload: blogs,
    });
  };

  return {
    logIn,
    logOut,
    saveBlogs,
  };
};

export default useAppDispatch;
