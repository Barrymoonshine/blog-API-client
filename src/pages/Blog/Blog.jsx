import uniqid from 'uniqid';
import './Blog.css';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import useGetComments from '../../hooks/useGetComments';
import CommentCard from '../../components/CommentCard/CommentCard';

const Blog = () => {
  const { blogs, username, token, comments, likes } = useAppState();
  const { addComment, addLike } = useAppDispatch();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { sendFetch, isError, isLoading } = useFetch();
  const { loading, error } = useGetComments(
    `https://ancient-water-2934.fly.dev/comments/${id}`,
    {
      method: 'GET',
    },
    id
  );

  const blog = blogs.find((item) => item._id === id);
  // get blog likes
  const isBlogLiked = blog.likes.includes(username);
  const totalLikes = blog.likes.length;

  const onSubmit = async (formData) => {
    const newComment = {
      ...formData,
      blogID: id,
      commentID: uniqid(),
      date: new Date().toISOString().split('T')[0],
      username,
    };
    await sendFetch('https://ancient-water-2934.fly.dev/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!isError) {
      addComment(newComment);
      reset();
    }
  };

  const likeBlog = async () => {
    await sendFetch(`https://ancient-water-2934.fly.dev/blogs/like/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ username }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!isError) {
      addLike(username);
    }
  };

  return (
    <>
      <div className='blog-page-container'>
        <div>
          <div className='blog-title'>
            <h4>{blog.title}</h4>
            <p>By: TBC, blog.author || Date: {blog.createdAt.slice(0, 10)}</p>
          </div>
          <div>
            <img className='blog-image' src={blog.image} alt='travel image' />
          </div>
          <div className='blog-content'>
            <h5>{blog.region}</h5>
            <p>{blog.content}</p>
          </div>
          {isBlogLiked ? (
            <button disabled={true} onClick={() => likeBlog()}>
              You like this blog!
            </button>
          ) : (
            <button onClick={() => likeBlog()}>Like</button>
          )}
          <div>Total likes : {totalLikes}</div>
        </div>
        <div className='comments-title'>
          <h4>Comments</h4>
        </div>
        {username ? (
          <div className='comment-form-container'>
            <form className='comment-form' onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='content'> Add comment:</label>
              <textarea
                {...register('comment', {
                  required: true,
                })}
                placeholder='Type your comment here'
              />
              {errors.comment && <span>This field is required</span>}

              {error && <span>{error.message}</span>}
              {isError && <span>{isError.message}</span>}
              <button className='submit-button' disabled={isLoading}>
                Submit
              </button>
            </form>
          </div>
        ) : (
          <h5> Please log in to add a comment </h5>
        )}
      </div>
      <div className='comments-container'>
        {isLoading && <p>Comments are loading </p>}
        {isError && <p>{isError.message} </p>}
        {comments &&
          comments.map((item) => (
            <CommentCard
              key={item.commentID}
              id={item.commentID}
              author={item.username}
              username={username}
              comment={item.comment}
              createdAt={item.date}
              token={token}
            />
          ))}
      </div>
    </>
  );
};

export default Blog;
