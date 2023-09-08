import ACTIONS from '../utils/ACTIONS';

// order initialState
export const initialState = {
  token: null,
  username: '',
  isLoading: false,
  error: null,
  blogs: null,
  comments: null,
  likes: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SAVE_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    case ACTIONS.SAVE_USERNAME:
      return {
        ...state,
        username: payload.username,
      };
    case ACTIONS.REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case ACTIONS.REMOVE_USERNAME:
      return {
        ...state,
        username: null,
      };
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
    default:
      return state;
  }
};

export default authReducer;
