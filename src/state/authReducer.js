import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        user: payload.user,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
