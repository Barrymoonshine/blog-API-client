import './EditBlog.css';
import { useForm } from 'react-hook-form';
import useAuthState from '../../hooks/useAuthState';
import useBlogsDispatch from '../../hooks/useBlogsDispatch';
import useBlogsState from '../../hooks/useBlogsState';
import { getBlog } from '../../helpers/helpers';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const { token, username } = useAuthState();
  const { blogs, blogsLoading, blogsError } = useBlogsState();
  const { editBlog } = useBlogsDispatch();

  const blog = blogs && getBlog(blogs, id);

  const navigate = useNavigate();

  const updateRedirect = () => {
    navigate('/my-account');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog ? blog.title : '',
      caption: blog ? blog.caption : '',
      content: blog ? blog.content : '',
      region: blog ? blog.region : '',
    },
  });

  const onSubmit = async (formData) => {
    const blog = new FormData();

    blog.append('title', formData.title);
    blog.append('caption', formData.caption);
    blog.append('content', formData.content);
    blog.append('region', formData.region);
    blog.append('image', formData.image[0]);
    blog.append('author', username);

    const isReqSent = await editBlog(blog, token);

    if (isReqSent) {
      reset();
      updateRedirect();
    }
  };

  return (
    <>
      {!blog ? (
        <span>Page loading...</span>
      ) : (
        <div className='edit-container'>
          <h4>Edit {blog.title}</h4>
          <form className='edit-form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='title'> Title:</label>
            <input {...register('title', { required: true })} />
            {errors.title && (
              <span className='edit-error'>Please provide a title</span>
            )}

            <label htmlFor='caption'> Caption:</label>
            <textarea rows='5' {...register('caption', { required: true })} />
            {errors.caption && (
              <span className='edit-error'>Please provide a caption</span>
            )}

            <label htmlFor='content'> Content:</label>
            <textarea rows='15' {...register('content', { required: true })} />
            {errors.content && (
              <span className='edit-error'>
                Please provide content for your blog
              </span>
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
              <span className='edit-error'>Please select a region</span>
            )}

            <label htmlFor='image'> Image:</label>
            <input {...register('image', { required: true })} type='file' />
            {errors.image && (
              <span className='edit-error'>Please provide an image</span>
            )}

            {blogsError && <span className='edit-error'>BlogsError - TBC</span>}
            <button className='edit-button' disabled={blogsLoading}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditBlog;
