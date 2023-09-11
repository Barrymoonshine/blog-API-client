import { ACTIONS } from '../utils/ACTIONS';

export const initialState = {
  isLoading: false,
  error: null,
  comments: null,
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

export default appReducer;
