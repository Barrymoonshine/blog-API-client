import ACTIONS from '../utils/ACTIONS';

// order initialState
export const initialState = {
  token: null,
  username: '',
  isLoading: false,
  error: null,
  blogs: null,
  comments: null,
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
    default:
      return state;
  }
};

export default authReducer;
