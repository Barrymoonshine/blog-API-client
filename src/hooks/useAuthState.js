import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useAuthDispatch from './useAuthDispatch';
import { useEffect } from 'react';

const useAuthState = () => {
  const { authState } = useContext(AppContext);

  const { checkAuthStatus } = useAuthDispatch();

  // Check auth status of any saved auth credentials on page load or refresh
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    token: authState.token,
    username: authState.username,
    isLoggedIn: authState.isLoggedIn,
    authLoading: authState.authLoading,
    authError: authState.authError,
  };
};

export default useAuthState;
