import './CommentCard.css';
import useCommentsState from '../../hooks/useCommentsState';
import useCommentsDispatch from '../../hooks/useCommentsDispatch';

const CommentCard = ({ comment, id, author, createdAt, username, token }) => {
  const { commentsLoading } = useCommentsState();

  const { deleteComment } = useCommentsDispatch();

  const handleDelete = async () => {
    await deleteComment(id, token);
  };

  return (
    <div className='comment-card-container'>
      <h6>By: {author}</h6>
      <p>{comment}</p>
      <div className='date-delete-container'>
        <span className='blog-date'>{createdAt.slice(0, 10)}</span>
        {author === username && (
          <button
            disabled={commentsLoading}
            className='delete-button'
            onClick={() => handleDelete()}
          >
            <img
              className='delete-icon'
              src='../images/delete.png'
              alt='delete'
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
