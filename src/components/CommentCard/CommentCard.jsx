import './CommentCard.css';

const CommentCard = ({ comment, createdAt, username }) => {
  return (
    <div className='comment-card-container'>
      <h6>{username}</h6>
      <span>{comment}</span>
      <span className='blog-date'>{createdAt.slice(0, 10)}</span>
    </div>
  );
};

export default CommentCard;
