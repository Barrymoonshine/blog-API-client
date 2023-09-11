import './SignUp.css';
import { useForm } from 'react-hook-form';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import useAuthState from '../../hooks/useAuthState';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const { createAuth } = useAuthDispatch();
  const { authLoading, authError } = useAuthState();

  const onSubmit = async (formData) => {
    await createAuth('https://ancient-water-2934.fly.dev/user/sign-up', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!authError) {
      reset();
    }
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

        <label htmlFor='password'> Confirm password:</label>
        <input
          type='password'
          {...register('confirmPassword', {
            required: true,
            validate: (value) => {
              if (watch('password') != value) {
                return 'Passwords do no match';
              }
            },
          })}
        />
        {errors.confirmPassword && <span>Passwords do not match</span>}

        {authError && <span className='error'>{authError.message}</span>}
        <button disabled={authLoading}> Sign up </button>
      </form>
    </>
  );
};

export default SignUp;
