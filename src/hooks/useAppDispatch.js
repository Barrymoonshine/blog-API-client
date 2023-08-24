import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';

const useAppDispatch = () => {
  const { dispatch } = useContext(AppContext);

  const toggleUserLogIn = () => {
    dispatch({
      type: ACTIONS.TOGGLE_LOG_IN,
    });
  };

  return {
    toggleUserLogIn,
  };
};

export default useAppDispatch;
