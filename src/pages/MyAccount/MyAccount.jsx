import './MyAccount.css';
import useAuthState from '../../hooks/useAuthState';
import useBlogsState from '../../hooks/useBlogsState';
import useLikesState from '../../hooks/useLikesState';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getTotalUserLikes, getUserBlogs } from '../../helpers/helpers';
import BlogOverview from '../../components/BlogOverview/BlogOverview';

const MyAccount = () => {
  const [isUsernameFormVisible, setIsUsernameFormVisible] = useState(false);
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false);
  const [isPasswordSuccessVisible, setIsPasswordSuccessVisible] =
    useState(false);
  const { username, authError, authLoading, token } = useAuthState();
  const { blogs } = useBlogsState();
  const { likes } = useLikesState();
  const { removeAuthError, updateUsername, updatePassword } = useAuthDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleFormVisibility = (form) => {
    form === 'username'
      ? setIsUsernameFormVisible((prevState) => !prevState)
      : setIsPasswordFormVisible((prevState) => !prevState);
  };

  const submitUsername = async (formData) => {
    const isReqSent = await updateUsername({ ...formData, username }, token);
    if (isReqSent) {
      reset();
      toggleFormVisibility('username');
    }
  };

  const submitPassword = async (formData) => {
    const isReqSent = await updatePassword({ ...formData, username }, token);
    if (isReqSent) {
      reset();
      toggleFormVisibility('password');
      setIsPasswordSuccessVisible(true);
    }
  };

  const hidePasswordSuccess = () => {
    setIsPasswordSuccessVisible(false);
  };

  const userLikes = blogs && likes && getTotalUserLikes(blogs, likes, username);
  const userBlogs = blogs && getUserBlogs(blogs, username);
  const totalPosts = blogs && userBlogs.length;

  return (
    <div
      className='my-account-container'
      onClick={() => {
        hidePasswordSuccess();
      }}
    >
      <div className='account-details'>
        <h5>Account Details</h5>
        <h6>Username:</h6>
        <span>{username}</span>
        {!isUsernameFormVisible ? (
          <button
            onClick={() => toggleFormVisibility('username')}
            className='update-username-button'
          >
            Update username
          </button>
        ) : (
          <form
            onClick={() => removeAuthError()}
            className='update-username-form'
            onSubmit={handleSubmit(submitUsername)}
          >
            <label htmlFor='Username'> New username:</label>
            <input {...register('newUsername', { required: true })} />
            {errors.newUsername && (
              <span className='update-credentials-error'>
                This field is required
              </span>
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
              <span className='update-credentials-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
              </span>
            )}

            {authError && (
              <span className='update-credentials-error'>{authError}</span>
            )}
            <button className='update-button' disabled={authLoading}>
              Update
            </button>
          </form>
        )}
        {!isPasswordFormVisible ? (
          <button
            onClick={() => toggleFormVisibility('password')}
            className='update-username-button'
          >
            Update password
          </button>
        ) : (
          <form
            onClick={() => removeAuthError()}
            className='update-password-form'
            onSubmit={handleSubmit(submitPassword)}
          >
            <label htmlFor='password'> Current Password:</label>
            <input
              type='password'
              {...register('password', {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
              })}
            />
            {errors.password && (
              <span className='update-credentials-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
              </span>
            )}
            <label htmlFor='New Password'> New Password:</label>
            <input
              type='password'
              {...register('newPassword', {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
              })}
            />
            {errors.newPassword && (
              <span className='update-credentials-error'>
                Please enter a password that is between 8 and 20 characters long
                and contains at least one number, one capital letter and one
                special symbol(!@#$%^&*=+-_)
              </span>
            )}
            <label htmlFor='Confirm Password'> Confirm New Password:</label>
            <input
              type='password'
              {...register('confirmNewPassword', {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
              })}
            />
            {errors.confirmNewPassword && (
              <span className='update-credentials-error'>
                Passwords must match
              </span>
            )}

            {authError && (
              <span className='update-credentials-error'>{authError}</span>
            )}
            <button className='update-button' disabled={authLoading}>
              Update
            </button>
          </form>
        )}
        {isPasswordSuccessVisible && (
          <span className='password-success'>
            Your password has been updated{' '}
          </span>
        )}
        <h5>Account Stats</h5>
        <p className='account-stats'>Total likes: {userLikes}</p>
        <p className='account-stats'>No. of posts: {totalPosts}</p>
      </div>
      <div className='user-blogs'>
        <h5>Your posts</h5>
        {userBlogs &&
          userBlogs.map((blog) => (
            <BlogOverview
              key={blog._id}
              id={blog._id}
              title={blog.title}
              caption={blog.caption}
              region={blog.region}
              image={blog.image}
              author={blog.author}
              createdAt={blog.createdAt}
              isBlogPublished={blog.published}
            />
          ))}
      </div>
    </div>
  );
};

export default MyAccount;
