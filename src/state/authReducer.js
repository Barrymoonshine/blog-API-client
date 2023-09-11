import { AUTH_ACTIONS } from '../utils/ACTIONS';

export const initialAuthState = {
  token: null,
  username: null,
  isLoggedIn: false,
  authLoading: false,
  authError: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTIONS.SAVE_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    case AUTH_ACTIONS.SAVE_USERNAME:
      return {
        ...state,
        username: payload.username,
      };
    case AUTH_ACTIONS.REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case AUTH_ACTIONS.REMOVE_USERNAME:
      return {
        ...state,
        username: null,
      };
    case AUTH_ACTIONS.TOGGLE_LOG_IN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    case AUTH_ACTIONS.TOGGLE_AUTH_LOADING:
      return {
        ...state,
        authLoading: !state.authLoading,
      };
    case AUTH_ACTIONS.REMOVE_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    case AUTH_ACTIONS.SAVE_AUTH_ERROR_AUTH_ERROR:
      return {
        ...state,
        authError: payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
