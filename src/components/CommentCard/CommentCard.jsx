import './CommentCard.css';
import useFetch from '../../hooks/useFetch';
import useAppDispatch from '../../hooks/useAppDispatch';

const CommentCard = ({ comment, id, author, createdAt, username, token }) => {
  const { sendFetch, isError } = useFetch();
  const { deleteComment } = useAppDispatch();

  const handleDelete = async () => {
    await sendFetch(
      `https://ancient-water-2934.fly.dev/comments/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!isError) {
      deleteComment(id);
    }
  };

  return (
    <div className='comment-card-container'>
      <h6>By: {author}</h6>
      <p>{comment}</p>
      <div className='date-delete-container'>
        <span className='blog-date'>{createdAt.slice(0, 10)}</span>
        {author === username && (
          <button className='delete-button' onClick={() => handleDelete()}>
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
