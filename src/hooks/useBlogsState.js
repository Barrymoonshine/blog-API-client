import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useBlogsState = () => {
  const { blogsState } = useContext(AppContext);
  return {
    blogs: blogsState.blogs,
    blogsLoading: blogsState.blogsLoading,
    blogsError: blogsState.blogsError,
  };
};

export default useBlogsState;
