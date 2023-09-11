import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useBlogsDispatch from './useBlogsDispatch';
import { useEffect } from 'react';

const useBlogsState = () => {
  const { blogsState } = useContext(AppContext);

  const { getBlogs } = useBlogsDispatch();

  // Get all blogs from DB on page load or refresh
  useEffect(() => {
    console.log('useBlogsState useEffect called');
    getBlogs();
  }, []);

  return {
    blogs: blogsState.blogs,
    blogsLoading: blogsState.blogsLoading,
    blogsError: blogsState.blogsError,
  };
};

export default useBlogsState;
