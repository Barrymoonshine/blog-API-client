import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ACTIONS from '../utils/ACTIONS';

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);

  const toggleUserLogIn = () => {
    dispatch({
      type: ACTIONS.TOGGLE_LOG_IN,
    });
  };

  return {
    toggleUserLogIn,
  };
};

export default useAuthDispatch;
