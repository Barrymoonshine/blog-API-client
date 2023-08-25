import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  isUserLoggedIn: false,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.TOGGLE_LOG_IN:
      return {
        ...state,
        isUserLoggedIn: !state.isUserLoggedIn,
      };
    default:
      return state;
  }
};

export default userReducer;
