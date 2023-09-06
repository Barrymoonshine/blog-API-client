import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ACTIONS from '../utils/ACTIONS';
import { useEffect } from 'react';
import useAppState from './useAppState';
import { getItem, removeItem } from '../helpers/localStorage';

const useAppDispatch = () => {
  const { state, dispatch } = useContext(AppContext);
  const { blogs } = useAppState();

  const logIn = (token) => {
    dispatch({
      type: ACTIONS.LOG_IN,
      payload: { token },
    });
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

  const logOut = () => {
    removeItem('token');
    dispatch({
      type: ACTIONS.LOG_OUT,
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
      // As state was initially null the first element was couldn't be returned
      dispatchComments(comments);
    } else {
      // Else new comments belong to existing blog and can be concatenated
      const newComments = [...state.comments, comments];
      dispatchComments(newComments);
    }
  };

  const addComment = (comment) => {
    // When adding the first comment onto a blog post, it will be returned as an object from the back-end
    // This needs to be saved in an array so it can be mapped through on the Blog page
    const newComments = state.comments
      ? [...state.comments, comment]
      : [comment];
    dispatchComments(newComments);
  };

  // Only run on page-load
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
        logIn(token);
      }
    };
    if (token) {
      verifyToken();
    }

    // Save blogs
    if (!blogs) {
      let isMounted = true;
      if (isMounted) {
        const fetchData = async () => {
          toggleLoading();
          try {
            const response = await fetch(
              'https://ancient-water-2934.fly.dev/blogs',
              { method: 'GET' }
            );
            const blogs = await response.json();
            dispatch({
              type: ACTIONS.SAVE_BLOGS,
              payload: { blogs },
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

  return {
    logIn,
    toggleLoading,
    updateError,
    logOut,
    saveComments,
    addComment,
  };
};

export default useAppDispatch;
