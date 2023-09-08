const checkDuplicateLike = (likes, docID, username) =>
  likes.some((like) => like.docID === docID && like.username === username);

export default checkDuplicateLike;
