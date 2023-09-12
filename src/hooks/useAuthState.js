import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAuthState = () => {
  const { authState } = useContext(AppContext);

  return {
    token: authState.token,
    username: authState.username,
    isLoggedIn: authState.isLoggedIn,
    authLoading: authState.authLoading,
    authError: authState.authError,
  };
};

export default useAuthState;
