import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ACTIONS } from '../utils/ACTIONS';

const useAppDispatch = () => {
  const { state, dispatch } = useContext(AppContext);

  const toggleLoading = () => {
    dispatch({
      type: ACTIONS.TOGGLE_LOADING,
    });
  };

  const updateError = (err) => {
    dispatch({
      type: ACTIONS.UPDATE_ERROR,
      payload: { err },
    });
  };

  const dispatchComments = (newComments) => {
    dispatch({
      type: ACTIONS.SAVE_COMMENTS,
      payload: { newComments },
    });
  };

  const saveComments = (comments) => {
    if (!comments || !state.comments) {
      // If no comments returned from the back-end or no existing comments saved in state
      // This is either the first time a Blog page has been loaded, or a new page has been loaded with no saved comments
      // And the provided comments from the back-end (null or an array of objects) should be saved into state
      dispatchComments(comments);
    } else if (state.comments[0] !== comments[0]) {
      // Else if the first comment saved in state doesn't match the returned comments from the back-end
      // A new page has been loaded with a new comments array and should be saved directly into state
      // Note, including this check in the first conditional array was resulting in an error when first loading comments
      // As state was initially null the first element was couldn't be retrieved
      dispatchComments(comments);
    } else {
      // Else new comments belong to existing blog and can be concatenated
      const newComments = [...state.comments, comments];
      dispatchComments(newComments);
    }
  };

  const addComment = (comment) => {
    // When adding a first comment to a blog this is sent as an object
    const newComments = state.comments
      ? [...state.comments, comment]
      : [comment];
    dispatchComments(newComments);
  };

  const deleteComment = (id) => {
    const newComments = state.comments.filter(
      (comment) => comment.commentID !== id
    );
    dispatchComments(newComments);
  };

  return {
    toggleLoading,
    updateError,
    saveComments,
    addComment,
    deleteComment,
  };
};

export default useAppDispatch;
