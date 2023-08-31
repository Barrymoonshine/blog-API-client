import ACTIONS from '../utils/ACTIONS';

export const initialState = {
  token: null,
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
    default:
      return state;
  }
};

export default authReducer;
