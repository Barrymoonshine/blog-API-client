import './Blog.css';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import useGetComments from '../../hooks/useGetComments';
import CommentCard from '../../components/CommentCard/CommentCard';

const Blog = () => {
  const { blogs, username, token, comments } = useAppState();
  const { addComment } = useAppDispatch();
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const blog = blogs.find((item) => item._id === id);

  const onSubmit = async (formData) => {
    const newComment = {
      ...formData,
      blogID: id,
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
        <button>Like - TBC</button>
      </div>
      <div className='comments-container'>
        <div className='comments-title'>
          <h4>Comments</h4>
        </div>
        <div>
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
          {loading && <p>Comments are loading </p>}
          {error && <p>{error.message} </p>}
          {comments &&
            comments.map((item) => (
              <CommentCard
                key={item._id}
                username={item.username}
                comment={item.comment}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
