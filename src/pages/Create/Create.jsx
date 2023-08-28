import './Create.css';
import { useForm } from 'react-hook-form';

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        // Nav to Home
        console.log('form successfully submitted');
      } else {
        console.log(data);
        // handle errors
      }
    } catch (err) {
      // handle errors
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <input type='submit' />
    </form>
  );
};

export default Create;
