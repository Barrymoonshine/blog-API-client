import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthState = () => {
  const { state } = useContext(AuthContext);

  return {
    user: state.user,
  };
};

export default useAuthState;
