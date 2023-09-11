import { LIKES_ACTIONS } from '../utils/ACTIONS';

export const initialLikesState = {
  likes: null,
  likesLoading: false,
  addLikeError: null,
};

const likesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIKES_ACTIONS.SAVE_LIKES:
      return {
        ...state,
        likes: payload.likes,
      };
    case LIKES_ACTIONS.TOGGLE_LIKES_LOADING:
      return {
        ...state,
        likesLoading: !state.likesLoading,
      };
    case LIKES_ACTIONS.SAVE_LIKES_ERROR:
      return {
        ...state,
        likesError: payload.error,
      };
    case LIKES_ACTIONS.REMOVE_LIKES_ERROR:
      return {
        ...state,
        likesError: null,
      };
    default:
      return state;
  }
};

export default likesReducer;
