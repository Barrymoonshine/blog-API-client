import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthState = () => {
  const { state } = useContext(AuthContext);

  return {
    isUserLoggedIn: state.isUserLoggedIn,
  };
};

export default useAuthState;
