import './SignUp.css';
import { useForm } from 'react-hook-form';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import useAuthState from '../../hooks/useAuthState';
import { Navigate, Link } from 'react-router-dom';

const SignUp = () => {
  const { createAuth, removeAuthError } = useAuthDispatch();
  const { authLoading, authError, isLoggedIn } = useAuthState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (formData) => {
    const isReqSent = await createAuth(
      'https://ancient-water-2934.fly.dev/auth',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (isReqSent) {
      reset();
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Navigate to='/' />
      ) : (
        <div className='sign-up-container'>
          <h4>Sign up for a new account</h4>
          <h5>Sign up</h5>
          <p>
            Or{' '}
            <Link to='/log-in'>
              <span>Log in to an existing account</span>
            </Link>
          </p>
          <form
            onClick={() => removeAuthError()}
            className='sign-up-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor='Username'> Username:</label>
            <input {...register('username', { required: true })} />
            {errors.username && (
              <span className='sign-up-error'>This field is required</span>
            )}

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
              <span className='sign-up-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
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
            {errors.confirmPassword && (
              <span className='sign-up-error'>Passwords do not match</span>
            )}
            {Array.isArray(authError) &&
              authError.map((error) => (
                <span key={error.msg} className='sign-up-error'>
                  {error.msg}
                </span>
              ))}
            {authError && typeof authError === 'string' && (
              <span className='sign-up-error'>{authError}</span>
            )}
            <button className='sign-up-button' disabled={authLoading}>
              Sign up
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
