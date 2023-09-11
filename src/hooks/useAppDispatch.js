import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ACTIONS } from '../utils/ACTIONS';
import { useEffect } from 'react';
import { saveItem, getItem, removeItem } from '../helpers/localStorage';
import checkDuplicateLike from '../helpers/helpers';

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

  const updateLikesError = (error) => {
    dispatch({
      type: ACTIONS.UPDATE_LIKES_ERROR,
      payload: { error },
    });
  };

  const addLike = async (docType, docID) => {
    try {
      const newLike = { username: state.username, docType, docID };
      const response = await fetch(`https://ancient-water-2934.fly.dev/like`, {
        method: 'POST',
        body: JSON.stringify(newLike),
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      if (response.ok) {
        const newLikes = state.likes ? [...state.likes, newLike] : [newLike];
        console.log('newLikes addLike', newLikes);
        dispatch({
          type: ACTIONS.ADD_LIKE,
          payload: { newLikes },
        });
      } else {
        const data = await response.json();
        console.log('data', data);
        updateLikesError(data);
      }
    } catch (error) {
      console.log('err', error);
      updateLikesError(error);
    }
  };

  const handleAddLike = (docType, docID) => {
    if (!checkDuplicateLike(state.likes, docID, state.username)) {
      addLike(docType, docID);
    }
  };

  // Only run on page-load or page refresh - currently causing bugs
  useEffect(() => {
    // Save blogs and likes
    console.log('useEffect in useAppDispatch called');
    if (!state.blogs && !state.likes) {
      console.log(
        'useEffect in useAppDispatch called & there is are not existing blogs or likes '
      );
      let isMounted = true;
      if (isMounted) {
        const fetchData = async () => {
          toggleLoading();
          try {
            const blogsResponse = await fetch(
              'https://ancient-water-2934.fly.dev/blogs',
              { method: 'GET' }
            );
            const likesResponse = await fetch(
              'https://ancient-water-2934.fly.dev/like',
              { method: 'GET' }
            );
            const blogs = await blogsResponse.json();
            const likes = await likesResponse.json();
            dispatch({
              type: ACTIONS.SAVE_BLOGS,
              payload: { blogs },
            });
            dispatch({
              type: ACTIONS.SAVE_LIKES,
              payload: { likes },
            });
          } catch (err) {
            updateError(err);
          } finally {
            toggleLoading();
          }
        };
        fetchData();
      }
      return () => {
        isMounted = false;
      };
    }
  }, []);

  // Order return
  return {
    toggleLoading,
    updateError,
    saveComments,
    addComment,
    deleteComment,
    handleAddLike,
  };
};

export default useAppDispatch;
