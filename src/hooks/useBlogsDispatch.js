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
      const response = await fetch(`${import.meta.env.API_URL}/blogs`, {
        method: 'POST',
        body: blog,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        saveBlogs(data);
        toggleBlogsLoading();
        return true;
      } else {
        saveBlogsError(data);
        toggleBlogsLoading();
        return false;
      }
    } catch (error) {
      saveBlogsError(error);
      toggleBlogsLoading();
      return false;
    }
  };

  const getBlogs = async () => {
    try {
      removeBlogsError();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
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

  const deleteBlog = async (id, token) => {
    try {
      removeBlogsError();
      toggleBlogsLoading();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/blogs/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Edge case, handle deleting last blog
        const blogs =
          blogsState.blogs.length === 1
            ? null
            : blogsState.blogs.filter((blog) => blog._id !== id);
        saveBlogs(blogs);
        toggleBlogsLoading();
        return true;
      } else {
        const error = await response.json();
        saveBlogsError(error);
        toggleBlogsLoading();
        return false;
      }
    } catch (error) {
      saveBlogsError(error);
      toggleBlogsLoading();
      return false;
    }
  };

  const togglePublished = async (id, isBlogPublished, token) => {
    try {
      removeBlogsError();
      toggleBlogsLoading();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: 'PATCH',
        body: JSON.stringify({ id, published: !isBlogPublished }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blogs = blogsState.blogs.map((blog) => {
          if (blog._id === id) {
            return { ...blog, published: !isBlogPublished };
          }
          return blog;
        });
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

  const editBlog = async (blog, token) => {
    try {
      removeBlogsError();
      toggleBlogsLoading();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: 'PUT',
        body: blog,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        saveBlogs(data);
        toggleBlogsLoading();
        return true;
      } else {
        saveBlogsError(data);
        toggleBlogsLoading();
        return false;
      }
    } catch (error) {
      saveBlogsError(error);
      toggleBlogsLoading();
      return false;
    }
  };

  return {
    addBlog,
    getBlogs,
    deleteBlog,
    togglePublished,
    editBlog,
  };
};

export default useBlogsDispatch;
