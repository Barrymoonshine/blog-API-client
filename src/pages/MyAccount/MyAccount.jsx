import './MyAccount.css';
import useAuthState from '../../hooks/useAuthState';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const MyAccount = () => {
  const [isUsernameFormVisible, setIsUsernameFormVisible] = useState(false);
  const { username, authError, authLoading, token } = useAuthState();
  const { removeAuthError, updateUsername } = useAuthDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitUsername = async (formData) => {
    const isReqSent = await updateUsername({ ...formData, username }, token);
    if (isReqSent) {
      reset();
    }
  };

  const toggleUsernameFormVisibility = () => {
    setIsUsernameFormVisible((prevState) => !prevState);
  };

  return (
    <div className='my-account-container'>
      <div className='account-details'>
        <h5>Account Details</h5>
        <h6>Username:</h6>
        <span>{username}</span>
        {!isUsernameFormVisible ? (
          <button
            onClick={() => toggleUsernameFormVisibility()}
            className='update-username-button'
          >
            Update username
          </button>
        ) : (
          <form
            onClick={() => removeAuthError()}
            className='reset-username-form'
            onSubmit={handleSubmit(submitUsername)}
          >
            <label htmlFor='Username'> New username:</label>
            <input {...register('newUsername', { required: true })} />
            {errors.username && (
              <span className='log-in-error'>This field is required</span>
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
              <span className='log-in-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
              </span>
            )}

            {authError && <span className='log-in-error'>{authError}</span>}
            <button className='update-button' disabled={authLoading}>
              Update
            </button>
          </form>
        )}

        <button>Update password</button>
        <h5>Account Stats</h5>
        <p>Total likes:</p>

        <p>No. of posts:</p>
      </div>
      <div className='account-blogs'>
        <h5>Your posts</h5>
        Map through blog posts
      </div>
    </div>
  );
};

export default MyAccount;
