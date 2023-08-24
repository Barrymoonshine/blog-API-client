import { useReducer } from 'react';
import appReducer, { initialState } from '../state/appReducer';

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export default useApp;
