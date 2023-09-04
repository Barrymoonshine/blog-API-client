import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  user: null,
  username: 'BarryMoonshine',
  isLoading: false,
  error: null,
  blogs: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.LOG_IN:
      console.log('payload.user', payload.user);
      return {
        ...state,
        user: payload.user,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        token: null,
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
    default:
      return state;
  }
};

export default authReducer;
