import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LIKES_ACTIONS } from '../utils/ACTIONS';

const useLikesDispatch = () => {
  const { likesDispatch } = useContext(AppContext);

  const toggleLikesLoading = () => {
    likesDispatch({
      type: LIKES_ACTIONS.TOGGLE_LIKES_LOADING,
    });
  };

  const saveLikesError = (error) => {
    likesDispatch({
      type: LIKES_ACTIONS.SAVE_LIKES_ERROR,
      payload: { error },
    });
  };

  const removeLikesError = () => {
    likesDispatch({
      type: LIKES_ACTIONS.REMOVE_LIKES_ERROR,
    });
  };

  const saveLikes = (likes) => {
    likesDispatch({
      type: LIKES_ACTIONS.SAVE_LIKES,
      payload: { likes },
    });
  };

  const toggleLike = async (username, docType, docID, token) => {
    try {
      removeLikesError();
      toggleLikesLoading();
      const newLike = { username, docType, docID };
      const response = await fetch(`https://ancient-water-2934.fly.dev/like`, {
        method: 'POST',
        body: JSON.stringify(newLike),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        saveLikes(data);
      } else {
        saveLikesError(data);
      }
    } catch (error) {
      saveLikesError(error);
    } finally {
      toggleLikesLoading();
    }
  };

  const getLikes = async () => {
    try {
      toggleLikesLoading();
      removeLikesError();
      const response = await fetch('https://ancient-water-2934.fly.dev/like', {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        saveLikes(data);
      } else {
        saveLikesError(data);
      }
    } catch (error) {
      saveLikesError(error);
    } finally {
      toggleLikesLoading();
    }
  };

  return {
    toggleLike,
    getLikes,
  };
};

export default useLikesDispatch;
