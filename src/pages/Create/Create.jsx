import './Create.css';
import { useForm } from 'react-hook-form';
import useAuthState from '../../hooks/useAuthState';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import useBlogsState from '../../hooks/useBlogsState';

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { token } = useAuthState();
  const { blogsLoading, blogsError } = useBlogsState();

  const { addBlog } = useBlogsDispatch();

  const onSubmit = async (formData) => {
    const blog = new FormData();

    blog.append('title', formData.title);
    blog.append('caption', formData.caption);
    blog.append('content', formData.content);
    blog.append('region', formData.region);
    blog.append('image', formData.image[0]);

    await addBlog(blog, token);

    if (!blogsError) {
      reset();
    }
  };

  return (
    <>
      <div className='create-container'>
        <h4>Create a blog post</h4>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'> Title:</label>
          <input {...register('title', { required: true })} />
          {errors.title && (
            <span className='create-error'>This field is required</span>
          )}

          <label htmlFor='caption'> Caption:</label>
          <textarea rows='5' {...register('caption', { required: true })} />
          {errors.caption && (
            <span className='create-error'>This field is required</span>
          )}

          <label htmlFor='content'> Content:</label>
          <textarea rows='15' {...register('content', { required: true })} />
          {errors.content && (
            <span className='create-error'>This field is required</span>
          )}

          <label htmlFor='content'> Region:</label>
          <select {...register('region', { required: true })}>
            <option value=''>--Please choose a region--</option>
            <option value='Africa'>Africa</option>
            <option value='Asia'>Asia</option>
            <option value='The Caribbean'>The Caribbean</option>
            <option value='Central America'>Central America</option>
            <option value='Europe'>Europe</option>
            <option value='North America'>North America</option>
            <option value='Oceania'>Oceania</option>
            <option value='South America'>South America</option>
          </select>
          {errors.region && (
            <span className='create-error'>Please select a region</span>
          )}

          <label htmlFor='image'> Image:</label>
          <input {...register('image', { required: true })} type='file' />
          {errors.image && (
            <span className='create-error'>This field is required</span>
          )}

          {blogsError && <span className='create-error'>{blogsError}</span>}
          <button className='create-button' disabled={blogsLoading}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
