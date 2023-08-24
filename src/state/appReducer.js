import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  isUserLoggedIn: false,
  blogs: [],
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.TOGGLE_LOG_IN:
      return {
        ...state,
        isUserLoggedIn: !state.isUserLoggedIn,
      };
    case ACTIONS.UPDATE_BlOGS:
      return {
        ...state,
        blogs: payload.data,
      };
    default:
      return state;
  }
};

export default userReducer;
