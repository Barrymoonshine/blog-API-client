export const checkDuplicateLike = (likes, docID, username) =>
  likes.some((like) => like.docID === docID && like.username === username);

export const getObjFromArray = (array, id) =>
  array.find((item) => item._id === id);
