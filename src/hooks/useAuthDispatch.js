import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({
        type: ACTIONS.LOG_IN,
        payload: { user },
      });
    }
  }, []);

  const logIn = (user) => {
    dispatch({
      type: ACTIONS.LOG_IN,
      payload: { user },
    });
  };

  const logOut = () => {
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
