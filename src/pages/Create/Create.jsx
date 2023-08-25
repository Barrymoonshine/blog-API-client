import './Create.css';
import { useForm } from 'react-hook-form';

const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
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

      <input type='submit' />
    </form>
  );
};

export default Create;
