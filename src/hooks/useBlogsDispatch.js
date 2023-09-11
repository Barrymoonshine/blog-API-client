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

  const getBlog = (id) => blogsState.blogs.find((item) => item._id === id);

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
        const newBlogs = [...blogsState.blogs, blog];
        blogsDispatch({
          type: BLOGS_ACTIONS.ADD_BLOG,
          payload: { newBlogs },
        });
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
    toggleBlogsLoading();
    removeBlogsError();
    try {
      const response = await fetch('https://ancient-water-2934.fly.dev/blogs', {
        method: 'GET',
      });
      const blogs = await response.json();

      blogsDispatch({
        type: BLOGS_ACTIONS.SAVE_BLOGS,
        payload: { blogs },
      });
    } catch (err) {
      saveBlogsError(err);
    } finally {
      toggleBlogsLoading();
    }
  };

  return {
    getBlog,
    addBlog,
    getBlogs,
  };
};

export default useBlogsDispatch;