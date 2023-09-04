import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    user: state.user,
    username: state.username,
    isLoading: state.isLoading,
    error: state.isLoading,
    blogs: state.blogs,
  };
};

export default useAppState;
