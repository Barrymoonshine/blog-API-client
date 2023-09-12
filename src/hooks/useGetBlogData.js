import { useState, useEffect } from 'react';
import useBlogsState from './useBlogsState';
import useBlogsDispatch from './useBlogsDispatch';
import useLikesDispatch from './useLikesDispatch';
import useCommentsDispatch from './useCommentsDispatch';

const useGetBlogData = (id) => {
  const [blogGetError, setBlogGetError] = useState(null);
  const [blogGetLoading, setBlogGetLoading] = useState(false);

  const { blogs } = useBlogsState();
  const { getBlogs } = useBlogsDispatch();
  const { getLikes } = useLikesDispatch();
  const { getComments } = useCommentsDispatch();

  useEffect(() => {
    const getData = async () => {
      console.log('useEffect in useGetBlogData running');
      try {
        setBlogGetLoading(true);
        await getLikes(id);
        await getComments();
        if (!blogs) {
          await getBlogs();
        }
      } catch (error) {
        setBlogGetError(error);
      } finally {
        setBlogGetLoading(false);
      }
    };
    getData();
  }, []);

  return { blogGetError, blogGetLoading };
};

export default useGetBlogData;
