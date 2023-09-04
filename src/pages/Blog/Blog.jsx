import './Blog.css';
import useAppState from '../../hooks/useAppState';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import useFetchGet from '../../hooks/useFetchGet';
import CommentCard from '../../components/CommentCard/CommentCard';

const Blog = () => {
  const { blogs, username, token } = useAppState();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { sendFetch, success, setSuccess, isError, isLoading } = useFetch();

  const {
    loading,
    error,
    data = [],
  } = useFetchGet(`https://ancient-water-2934.fly.dev/comments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('blogs on Blog', blogs);

  console.log('data', data);

  console.log('!data', !data);

  console.log('data === null', data === null);

  const blog = blogs.find((item) => item._id === id);

  const onSubmit = async (formData) => {
    await sendFetch('https://ancient-water-2934.fly.dev/comments', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        blogID: id,
        username: username,
        date: new Date(),
      }),
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

            {error && <span>{error}</span>}
            <button className='submit-button' disabled={isLoading}>
              Submit
            </button>
          </form>
          {loading && <p>Comments are loading </p>}
          {error && <p>{error} </p>}
          {data &&
            data.map((item) => (
              <CommentCard key={item._id} comment={item.comment} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
