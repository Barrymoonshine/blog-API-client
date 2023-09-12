import { COMMENTS_ACTIONS } from '../utils/ACTIONS';

export const initialCommentsState = {
  comments: null,
  commentsLoading: false,
  commentsError: null,
};

const commentsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENTS_ACTIONS.SAVE_COMMENTS:
      return {
        ...state,
        comments: payload.newComments,
      };
    case COMMENTS_ACTIONS.TOGGLE_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: !state.commentsLoading,
      };
    case COMMENTS_ACTIONS.SAVE_COMMENTS_ERROR:
      return {
        ...state,
        comments: payload.error,
      };
    case COMMENTS_ACTIONS.REMOVE_COMMENTS_ERROR:
      return {
        ...state,
        commentsError: null,
      };
    default:
      return state;
  }
};

export default commentsReducer;
