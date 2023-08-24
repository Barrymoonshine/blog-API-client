import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useGameState = () => {
  const { state } = useContext(AppContext);

  return {
    isUserLoggedIn: state.isUserLoggedIn,
  };
};

export default useGameState;
