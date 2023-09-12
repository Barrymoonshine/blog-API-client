import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useCommentsState = () => {
  const { commentsState } = useContext(AppContext);

  return {
    comments: commentsState.comments,
    commentsLoading: commentsState.commentsLoading,
    commentsError: commentsState.commentsError,
  };
};

export default useCommentsState;
