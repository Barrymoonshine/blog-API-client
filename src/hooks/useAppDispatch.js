import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';
import { saveItem, getItem, removeItem } from '../helpers/localStorage';

const useAppDispatch = () => {
  const { state, dispatch } = useContext(AppContext);

  const saveToken = (token) => {
    saveItem('token', token);
    dispatch({
      type: ACTIONS.SAVE_TOKEN,
      payload: { token },
    });
  };

  const saveUsername = (username) => {
    saveItem('username', username);
    dispatch({
      type: ACTIONS.SAVE_USERNAME,
      payload: { username },
    });
  };

  const handleLogIn = (token, username) => {
    saveToken(token);
    saveUsername(username);
  };

  const removeToken = () => {
    removeItem('token');
    dispatch({
      type: ACTIONS.REMOVE_TOKEN,
    });
  };

  const removeUsername = () => {
    removeItem('username');
    dispatch({
      type: ACTIONS.REMOVE_USERNAME,
    });
  };

  const handleLogOut = () => {
    removeToken();
    removeUsername();
  };

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

  const checkDuplicateLike = (newLike) =>
    state.likes.find((like) => like.docID === newLike.docID);

  const handleAddLike = (newLike) => {
    const newLikes = state.likes ? [...state.likes, newLike] : [newLike];
    dispatch({
      type: ACTIONS.ADD_LIKE,
      payload: { newLikes },
    });
  };

  // Only run on page-load or page refresh - currently causing bugs
  useEffect(() => {
    // Check whether token is present and still valid
    const token = getItem('token');
    const verifyToken = async () => {
      const response = await fetch(
        'https://ancient-water-2934.fly.dev/user/authenticate',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const username = getItem('username');
        handleLogIn(token, username);
      } else {
        // Remove any data in local storage
        handleLogOut();
      }
    };
    if (token) {
      verifyToken();
    }

    // Save blogs and likes
    if (!state.blogs && !state.likes) {
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
    handleLogIn,
    handleLogOut,
    toggleLoading,
    updateError,
    saveComments,
    addComment,
    saveUsername,
    deleteComment,
    checkDuplicateLike,
    handleAddLike,
  };
};

export default useAppDispatch;
