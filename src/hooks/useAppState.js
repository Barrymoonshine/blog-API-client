import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  // Order app state
  return {
    token: state.token,
    username: state.username,
    isLoading: state.isLoading,
    error: state.isLoading,
    blogs: state.blogs,
    comments: state.comments,
    likes: state.likes,
  };
};

export default useAppState;
