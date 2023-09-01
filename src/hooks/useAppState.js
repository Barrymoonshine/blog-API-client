import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    token: state.token,
    isLoading: state.isLoading,
    error: state.isLoading,
    blogs: state.blogs,
  };
};

export default useAppState;
