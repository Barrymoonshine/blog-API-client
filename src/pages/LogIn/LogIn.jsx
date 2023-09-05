import './LogIn.css';
import { useForm } from 'react-hook-form';
import useCreateAuth from '../../hooks/useCreateAuth';

const LogIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createAuth, error, isLoading } = useCreateAuth();

  const onSubmit = async (formData) => {
    await createAuth('https://ancient-water-2934.fly.dev/user/log-in', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='Username'> Username:</label>
        <input {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}

        <label htmlFor='password'> Password:</label>
        <input
          type='password'
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
          })}
        />
        {errors.password && (
          <span>
            Please enter a password that is between 8 and 20 characters long and
            contains at least one number, one capital letter and one special
            symbol(!@#$%^&*=+-_)
          </span>
        )}

        {error && <span className='error'>{error.message}</span>}
        <button disabled={isLoading}> Log in </button>
      </form>
    </>
  );
};

export default LogIn;
