import { useReducer } from 'react';
import appReducer, { initialState } from '../state/appReducer';
import authReducer, { initialAuthState } from '../state/authReducer';
import blogsReducer, { initialBlogsState } from '../state/blogsReducer';

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [blogsState, blogsDispatch] = useReducer(
    blogsReducer,
    initialBlogsState
  );

  return {
    state,
    dispatch,
    authState,
    authDispatch,
    blogsState,
    blogsDispatch,
  };
};

export default useApp;
