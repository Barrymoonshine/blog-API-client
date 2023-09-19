import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { COMMENTS_ACTIONS } from '../utils/ACTIONS';

const useCommentsDispatch = () => {
  const { commentsState, commentsDispatch } = useContext(AppContext);

  const toggleCommentsLoading = () => {
    commentsDispatch({
      type: COMMENTS_ACTIONS.TOGGLE_COMMENTS_LOADING,
    });
  };

  const removeCommentsError = () => {
    commentsDispatch({
      type: COMMENTS_ACTIONS.REMOVE_COMMENTS_ERROR,
    });
  };

  const saveCommentsError = (error) => {
    commentsDispatch({
      type: COMMENTS_ACTIONS.SAVE_COMMENTS_ERROR,
      payload: { error },
    });
  };

  const saveComments = (newComments) => {
    commentsDispatch({
      type: COMMENTS_ACTIONS.SAVE_COMMENTS,
      payload: { newComments },
    });
  };

  const handleSaveComments = (comments) => {
    if (!comments || !commentsState.comments) {
      // If no comments returned from the back-end or no existing comments saved in state
      // This is either the first time a Blog page has been loaded, or a new page has been loaded with no saved comments
      // And the provided comments from the back-end (null or an array of objects) should be saved into state
      saveComments(comments);
    } else if (commentsState.comments[0] !== comments[0]) {
      // Else if the first comment saved in state doesn't match the returned comments from the back-end
      // A new page has been loaded with a new comments array and should be saved directly into state
      // Note, including this check in the first conditional array was resulting in an error when first loading comments
      // As state was initially null the first element was couldn't be retrieved
      saveComments(comments);
    } else {
      // Else new comments belong to existing blog and can be concatenated
      const newComments = [...commentsState.comments, comments];
      saveComments(newComments);
    }
  };

  const addComment = async (comment, token) => {
    try {
      toggleCommentsLoading();
      removeCommentsError();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // When adding a first comment to a blog this is sent as an object
        const newComments = commentsState.comments
          ? [...commentsState.comments, comment]
          : [comment];
        saveComments(newComments);
        toggleCommentsLoading();
        return true;
      } else {
        const error = await response.json();
        saveCommentsError(error);
        toggleCommentsLoading();
        return false;
      }
    } catch (error) {
      saveCommentsError(error);
      toggleCommentsLoading();
      return false;
    }
  };

  const deleteComment = async (id, token) => {
    try {
      toggleCommentsLoading();
      removeCommentsError();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const newComments = commentsState.comments.filter(
          (comment) => comment.commentID !== id
        );
        saveComments(newComments);
      } else {
        const data = await response.json();
        saveCommentsError(data);
      }
    } catch (error) {
      saveCommentsError(error);
    } finally {
      toggleCommentsLoading();
    }
  };

  const getComments = async (id) => {
    try {
      toggleCommentsLoading();
      removeCommentsError();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      console.log('response', response);
      console.log('data', data);
      if (response.ok) {
        // When no comments are found, Mongoose returns an empty array
        data.length === 0 ? handleSaveComments(null) : handleSaveComments(data);
      } else {
        saveCommentsError(data);
      }
    } catch (error) {
      removeCommentsError(error);
    } finally {
      toggleCommentsLoading(false);
    }
  };

  return {
    saveComments,
    addComment,
    deleteComment,
    getComments,
  };
};

export default useCommentsDispatch;
