import './CommentCard.css';

const CommentCard = ({ comment, author, createdAt, username }) => {
  // need two different usernames to compare
  // Name username coming from comments commentAuthor

  // handleDelete request

  return (
    <div className='comment-card-container'>
      <h6>{author}</h6>
      <span>{comment}</span>
      <span className='blog-date'>{createdAt.slice(0, 10)}</span>
      {author === username && <button>Delete</button>}
    </div>
  );
};

export default CommentCard;
