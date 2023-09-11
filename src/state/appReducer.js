import { ACTIONS } from '../utils/ACTIONS';

export const initialState = {
  isLoading: false,
  error: null,
  blogs: null,
  comments: null,
  likes: null,
  addLikeError: null,
};

const appReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTIONS.SAVE_BLOGS:
      return {
        ...state,
        blogs: payload.blogs,
      };
    case ACTIONS.UPDATE_ERROR:
      return {
        ...state,
        blogs: payload.err,
      };
    case ACTIONS.SAVE_COMMENTS:
      return {
        ...state,
        comments: payload.newComments,
      };
    case ACTIONS.ADD_LIKE:
      return {
        ...state,
        likes: payload.newLikes,
      };
    case ACTIONS.SAVE_LIKES:
      return {
        ...state,
        likes: payload.likes,
      };
    case ACTIONS.UPDATE_LIKES_ERROR:
      return {
        ...state,
        likes: payload.error,
      };
    default:
      return state;
  }
};

export default appReducer;
