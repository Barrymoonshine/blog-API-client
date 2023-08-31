import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      console.log('existing user in local storage', token);
      dispatch({
        type: ACTIONS.LOG_IN,
        payload: { token },
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

  return {
    logIn,
    logOut,
  };
};

export default useAuthDispatch;
