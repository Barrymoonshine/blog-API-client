import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    token: state.token,
    username: state.username,
    isLoading: state.isLoading,
    error: state.isLoading,
    blogs: state.blogs,
    comments: state.comments,
  };
};

export default useAppState;
