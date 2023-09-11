import { useReducer } from 'react';
import appReducer, { initialState } from '../state/appReducer';
import authReducer, { initialAuthState } from '../state/authReducer';
import blogsReducer, { initialBlogsState } from '../state/blogsReducer';
import likesReducer, { initialLikesState } from '../state/likesReducer';

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [blogsState, blogsDispatch] = useReducer(
    blogsReducer,
    initialBlogsState
  );
  const [likesState, likesDispatch] = useReducer(
    likesReducer,
    initialLikesState
  );

  return {
    state,
    dispatch,
    authState,
    authDispatch,
    blogsState,
    blogsDispatch,
    likesState,
    likesDispatch,
  };
};

export default useApp;
