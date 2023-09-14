import './LogIn.css';
import { useForm } from 'react-hook-form';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import useAuthState from '../../hooks/useAuthState';
import { Navigate, Link } from 'react-router-dom';

const LogIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createAuth, removeAuthError } = useAuthDispatch();
  const { authLoading, authError, isLoggedIn } = useAuthState();

  const onSubmit = async (formData) => {
    await createAuth('https://ancient-water-2934.fly.dev/user/log-in', {
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
      {isLoggedIn ? (
        <Navigate to='/' />
      ) : (
        <div className='log-in-container'>
          <h4>Welcome back weary traveler</h4>
          <h5>Sign in to your account</h5>
          <p>
            Or{' '}
            <Link to='/sign-up'>
              <span>Sign up for a new account</span>
            </Link>
          </p>
          <form className='log-in-form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='Username'> Username:</label>
            <input
              onClick={() => removeAuthError()}
              {...register('username', { required: true })}
            />
            {errors.username && (
              <span className='log-in-error'>This field is required</span>
            )}

            <label htmlFor='password'> Password:</label>
            <input
              onClick={() => removeAuthError()}
              type='password'
              {...register('password', {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
              })}
            />
            {errors.password && (
              <span className='log-in-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
              </span>
            )}

            {authError && <span className='log-in-error'>{authError}</span>}
            <button className='log-in-button' disabled={authLoading}>
              Log in
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LogIn;
