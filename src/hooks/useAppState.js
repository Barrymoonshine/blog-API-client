import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    isUserLoggedIn: state.isUserLoggedIn,
  };
};

export default useAppState;
