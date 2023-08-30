import { useReducer } from 'react';
import authReducer, { initialState } from '../state/authReducer';
import { useEffect } from 'react';
import ACTIONS from '../utils/ACTIONS';

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log('existing user in local storage', user);
      dispatch({
        type: ACTIONS.LOG_IN,
        payload: { user },
      });
    }
  }, []);

  return {
    state,
    dispatch,
  };
};

export default useAuth;
