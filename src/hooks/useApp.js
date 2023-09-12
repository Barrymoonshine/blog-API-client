import { useReducer } from 'react';
import authReducer, { initialAuthState } from '../state/authReducer';
import blogsReducer, { initialBlogsState } from '../state/blogsReducer';
import likesReducer, { initialLikesState } from '../state/likesReducer';
import commentsReducer, {
  initialCommentsState,
} from '../state/commentsReducer';

const useApp = () => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [blogsState, blogsDispatch] = useReducer(
    blogsReducer,
    initialBlogsState
  );
  const [likesState, likesDispatch] = useReducer(
    likesReducer,
    initialLikesState
  );
  const [commentsState, commentsDispatch] = useReducer(
    commentsReducer,
    initialCommentsState
  );

  return {
    authState,
    authDispatch,
    blogsState,
    blogsDispatch,
    likesState,
    likesDispatch,
    commentsState,
    commentsDispatch,
  };
};

export default useApp;
