import './Create.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const multiFormData = new FormData();

      multiFormData.append('title', formData.title);
      multiFormData.append('caption', formData.caption);
      multiFormData.append('content', formData.content);
      multiFormData.append('region', formData.region);
      multiFormData.append('image', formData.image[0]);

      const response = await fetch('https://ancient-water-2934.fly.dev/blogs', {
        method: 'POST',
        body: multiFormData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data);
        reset();
      } else {
        setErrorMessage(data.message);
        console.log(data);
      }
    } catch (err) {
      setErrorMessage(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
      console.log(err);
    }
  };

  return (
    <>
      {successMessage ? (
        <div>
          {successMessage}
          <button onClick={() => setSuccessMessage(null)}>
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

          {errorMessage && (
            <div>
              {errorMessage.map((error) => {
                <p>{error}</p>;
              })}
              <button onClick={() => setErrorMessage(null)}>Try again?</button>
            </div>
          )}
          <input type='submit' />
        </form>
      )}
    </>
  );
};

export default Create;
