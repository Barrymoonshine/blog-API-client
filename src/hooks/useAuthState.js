import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthState = () => {
  const { state } = useContext(AuthContext);

  return {
    token: state.token,
  };
};

export default useAuthState;
