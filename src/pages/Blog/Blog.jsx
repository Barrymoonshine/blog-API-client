import uniqid from 'uniqid';
import './Blog.css';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';
import useLikesState from '../../hooks/useLikesState';
import useLikesDispatch from '../../hooks/useLikesDispatch';
import {
  getBlog,
  checkUserLiked,
  getTotalBlogLikes,
} from '../../helpers/helpers';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import useGetComments from '../../hooks/useGetComments';
import CommentCard from '../../components/CommentCard/CommentCard';

const Blog = () => {
  const { username, token, isLoggedIn } = useAuthState();
  const { blogs } = useBlogsState();
  const { likes, likesLoading, likesError } = useLikesState();
  const { id } = useParams();
  const { comments } = useAppState();
  const blog = getBlog(blogs, id);
  const isBlogLiked = checkUserLiked(likes, id, username);
  const totalBlogLikes = getTotalBlogLikes(likes, id);

  const { addComment } = useAppDispatch();
  const { handleAddLike } = useLikesDispatch();
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
          {isBlogLiked && isLoggedIn && (
            <button disabled={true}>You like this blog!</button>
          )}
          {!isBlogLiked && isLoggedIn && (
            <button
              disabled={likesLoading}
              onClick={() => handleAddLike(username, 'blog', id, token)}
            >
              Like
            </button>
          )}
          {likesError && (
            <span>
              There has been an error with liking this post, please try again{' '}
            </span>
          )}
          {!isLoggedIn && <span>Log in to like this post </span>}
          <div>Total likes : {totalBlogLikes}</div>
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
        {loading && <p>Comments are loading </p>}
        {error && <p>{error.message} </p>}
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
