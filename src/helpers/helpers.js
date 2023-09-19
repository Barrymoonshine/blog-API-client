export const getBlog = (blogs, id) => blogs.find((item) => item._id === id);

export const checkUserLiked = (likes, id, username) =>
  likes.find((like) => like.docID === id && like.username === username);

export const getTotalBlogLikes = (likes, id) =>
  likes.filter((like) => like.docType === 'blog' && like.docID === id).length;

export const getTopThreeLikedBlogs = (blogs, likes) =>
  blogs
    .filter((blog) => blog.published === true)
    .map((blog) => ({
      ...blog,
      likes: getTotalBlogLikes(likes, blog._id),
    }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

export const getRegionBlogs = (blogs, santisedRegion) =>
  blogs.filter(
    (blog) => blog.region === santisedRegion && blog.published === true
  );

export const getTotalUserLikes = (blogs, likes, username) =>
  blogs
    .filter((blog) => blog.author === username)
    .map((blog) => ({
      ...blog,
      likes: getTotalBlogLikes(likes, blog._id),
    }))
    .reduce((acc, curr) => acc + curr.likes, 0);

export const getUserBlogs = (blogs, username) =>
  blogs.filter((blog) => blog.author === username);
