import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BLOGS_ACTIONS } from '../utils/ACTIONS';

const useBlogsDispatch = () => {
  const { blogsState, blogsDispatch } = useContext(AppContext);

  const toggleBlogsLoading = () => {
    blogsDispatch({
      type: BLOGS_ACTIONS.TOGGLE_BLOGS_LOADING,
    });
  };

  const removeBlogsError = () => {
    blogsDispatch({
      type: BLOGS_ACTIONS.REMOVE_BLOGS_ERROR,
    });
  };

  const saveBlogsError = (error) => {
    blogsDispatch({
      type: BLOGS_ACTIONS.SAVE_BLOGS_ERROR,
      payload: { error },
    });
  };

  const saveBlogs = (blogs) => {
    blogsDispatch({
      type: BLOGS_ACTIONS.SAVE_BLOGS,
      payload: { blogs },
    });
  };

  const addBlog = async (blog, token) => {
    try {
      removeBlogsError();
      toggleBlogsLoading();
      const response = fetch('https://ancient-water-2934.fly.dev/blogs', {
        method: 'POST',
        body: blog,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blogs = [...blogsState.blogs, blog];
        saveBlogs(blogs);
      } else {
        const error = await response.json();
        saveBlogsError(error);
      }
    } catch (error) {
      saveBlogsError(error);
    } finally {
      toggleBlogsLoading();
    }
  };

  const getBlogs = async () => {
    console.log('getBlogs called');
    try {
      toggleBlogsLoading();
      removeBlogsError();
      const response = await fetch('https://ancient-water-2934.fly.dev/blogs', {
        method: 'GET',
      });
      const blogs = await response.json();
      saveBlogs(blogs);
    } catch (error) {
      saveBlogsError(error);
    } finally {
      toggleBlogsLoading();
    }
  };

  return {
    addBlog,
    getBlogs,
  };
};

export default useBlogsDispatch;
