import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ACTIONS from '../utils/ACTIONS';

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);

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
