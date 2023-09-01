import './Blog.css';
import useAppState from '../../hooks/useAppState';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';

const Blog = () => {
  const { blogs } = useAppState();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { sendFetch, success, setSuccess, error, isLoading } = useFetch();
  const { token } = useAppState();

  const blog = blogs.find((item) => item._id === id);

  const onSubmit = async (formData) => {
    await sendFetch('https://ancient-water-2934.fly.dev/blogs', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <>
      <div className='blog-page-container'>
        <div className='blog-title'>
          <h4>{blog.title}</h4>
          <p>
            By: {blog.author} || Date: {blog.createdAt.slice(0, 10)}
          </p>
        </div>
        <div>
          <img className='blog-image' src={blog.image} alt='travel image' />
        </div>
        <div className='blog-content'>
          <h5>{blog.region}</h5>
          <p>{blog.content}</p>
        </div>
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

            {error && <span>{error}</span>}
            <button className='submit-button' disabled={isLoading}>
              {' '}
              Submit{' '}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Blog;
