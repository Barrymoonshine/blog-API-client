import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    isLoading: state.isLoading,
    error: state.isLoading,
    blogs: state.blogs,
    comments: state.comments,
    likes: state.likes,
    likesError: state.likesError,
  };
};

export default useAppState;
