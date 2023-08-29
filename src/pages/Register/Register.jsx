import './Register.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
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
          Congratulations you are now signed up, would you like to
          <Link to='/log-in' style={{ textDecoration: 'none' }}>
            <button onClick={() => setSuccessMessage(null)}>Log in? </button>
          </Link>
        </div>
      ) : (
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
          {errors.confirmPassword && <span>Passwords do not match</span>}

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

export default Register;
