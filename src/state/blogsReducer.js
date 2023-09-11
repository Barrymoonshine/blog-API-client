import { BLOGS_ACTIONS } from '../utils/ACTIONS';

export const initialBlogsState = {
  blogs: null,
  blogsLoading: false,
  blogsError: null,
};

const blogsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOGS_ACTIONS.SAVE_BLOGS:
      return {
        ...state,
        blogs: payload.blogs,
      };
    case BLOGS_ACTIONS.TOGGLE_BLOGS_LOADING:
      return {
        ...state,
        blogsLoading: !state.blogsLoading,
      };
    case BLOGS_ACTIONS.SAVE_BLOGS_ERROR:
      return {
        ...state,
        blogsError: payload.error,
      };
    case BLOGS_ACTIONS.REMOVE_BLOGS_ERROR:
      return {
        ...state,
        blogsError: null,
      };
    case BLOGS_ACTIONS.ADD_BLOG:
      return {
        ...state,
        blogs: payload.newBlogs,
      };
    default:
      return state;
  }
};

export default blogsReducer;
