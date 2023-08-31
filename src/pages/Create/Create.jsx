import './Create.css';
import { useForm } from 'react-hook-form';
import useAppState from '../../hooks/useAppState';
import useFetch from '../../hooks/useFetch';

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { token } = useAppState();

  const { sendFetch, success, setSuccess, error, isLoading } = useFetch();

  const onSubmit = async (formData) => {
    const multiFormData = new FormData();

    multiFormData.append('title', formData.title);
    multiFormData.append('caption', formData.caption);
    multiFormData.append('content', formData.content);
    multiFormData.append('region', formData.region);
    multiFormData.append('image', formData.image[0]);

    await sendFetch('https://ancient-water-2934.fly.dev/blogs', {
      method: 'POST',
      body: multiFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
      {success ? (
        <div>
          {success}
          <button
            onClick={() => {
              reset(), setSuccess(null);
            }}
          >
            Create another post?
          </button>
        </div>
      ) : (
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'> Title:</label>
          <input {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}

          <label htmlFor='caption'> Caption:</label>
          <input {...register('caption', { required: true })} />
          {errors.caption && <span>This field is required</span>}

          <label htmlFor='content'> Content:</label>
          <textarea {...register('content', { required: true })} />
          {errors.content && <span>This field is required</span>}

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
          {errors.region && <span>Please select a region</span>}

          <label htmlFor='image'> Image:</label>
          <input {...register('image', { required: true })} type='file' />
          {errors.image && <span>This field is required</span>}

          {error && <span>{error}</span>}
          <button disabled={isLoading}> Submit </button>
        </form>
      )}
    </>
  );
};

export default Create;
