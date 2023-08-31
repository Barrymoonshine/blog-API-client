import { useReducer } from 'react';
import authReducer, { initialState } from '../state/authReducer';

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export default useAuth;
