import './LogIn.css';
import { useForm } from 'react-hook-form';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import useAuthState from '../../hooks/useAuthState';
import { Navigate, Link } from 'react-router-dom';

const LogIn = () => {
  const { createAuth, removeAuthError } = useAuthDispatch();
  const { authLoading, authError, isLoggedIn } = useAuthState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const isReqSent = await createAuth(`${import.meta.env.VITE_API_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (isReqSent) {
      reset();
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Navigate to='/' />
      ) : (
        <div className='log-in-container'>
          <h4>Welcome back fellow traveler</h4>
          <h5>Sign in to your account</h5>
          <p>
            Or{' '}
            <Link to='/sign-up'>
              <span>Sign up for a new account</span>
            </Link>
          </p>
          <form
            onClick={() => removeAuthError()}
            className='log-in-form'
            onSubmit={handleSubmit(onSubmit)}
            aria-label='log-in-form'
          >
            <label htmlFor='username'> Username:</label>
            <input
              id='username'
              {...register('username', { required: true })}
            />
            {errors.username && (
              <span className='log-in-error'>Username is required</span>
            )}

            <label htmlFor='password'> Password:</label>
            <input
              id='password'
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
            {Array.isArray(authError) &&
              authError.map((error) => (
                <span key={error.msg} className='auth-error'>
                  {error.msg}
                </span>
              ))}
            {authError && typeof authError === 'string' && (
              <span className='auth-error'>{authError}</span>
            )}
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
