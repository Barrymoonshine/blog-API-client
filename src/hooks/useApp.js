import { useReducer } from 'react';
import appReducer, { initialState } from '../state/appReducer';
import authReducer, { initialAuthState } from '../state/authReducer';

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  return {
    state,
    dispatch,
    authState,
    authDispatch,
  };
};

export default useApp;
