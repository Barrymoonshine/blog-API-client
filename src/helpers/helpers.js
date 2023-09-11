export const checkDuplicateLike = (likes, docID, username) =>
  likes.some((like) => like.docID === docID && like.username === username);

export const getBlog = (blogs, id) => blogs.find((item) => item._id === id);

export const checkUserLiked = (likes, id, username) =>
  likes.find((like) => like.docID === id && like.username === username);

export const getTotalBlogLikes = (likes, id) =>
  likes.filter((like) => like.docType === 'blog' && like.docID === id).length;
