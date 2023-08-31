import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  token: null,
  blogs: [],
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        token: payload.token,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        token: null,
      };
    case ACTIONS.SAVE_BLOGS:
      return {
        ...state,
        blogs: payload.blogs,
      };
    default:
      return state;
  }
};

export default authReducer;
